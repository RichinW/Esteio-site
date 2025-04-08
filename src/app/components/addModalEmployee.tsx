"use client";
import { FC, useEffect, useState } from "react";
import InputText from "./inputText";
import { AccountOut } from "@/type/accountType";
import { EmployeeIn } from "@/type/employeeType";
import SelectDefault from "./Select";
import api from "../services/api";
import { toast } from "react-toastify";
import InputMask from "react-input-mask-next";
import { BranchOut } from "@/type/branchType";
import { PositionOut } from "@/type/positionType";
import { DepartmentOut } from "@/type/departmentType";

interface Options {
  label: string;
  value: number;
}

interface AddModalEmployeeProps {
  onEmployeeAdded: () => void;
}

const AddModalEmployee: FC<AddModalEmployeeProps> = ({ onEmployeeAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [employee, setEmployee] = useState<EmployeeIn>({
    name: "",
    date_of_birth: "",
    cpf: "",
    phone: "",
    phone_contact: "",
    id_account: null,
    id_branch: null,
    id_department: null,
    id_position: null,
    address: "",
    allergy: "",
    medical_condition: "",
    regular_medication: "",
    blood_type: "",
    date_of_hire: ""
  });
  const [accounts, setAcconts] = useState<AccountOut[]>([]);
  const [branches, setBranches] = useState<BranchOut[]>([]);
  const [departaments, setDepartaments] = useState<DepartmentOut[]>([]);
  const [positions, setPositions] = useState<PositionOut[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNameChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      name: value || "",
    }));
  };

  const handleAddressChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      address: value || "",
    }));
  };

  const handleGenderChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      gender: value || "",
    }));
  };

  const handleBloodChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      blood_type: value || "",
    }));
  };

  const handleMedicalConditionChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      medical_condition: value || "",
    }));
  };

  const handleRegularMedicationChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      regular_medication: value || "",
    }));
  };

  const handleAllergyChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      allergy: value || "",
    }));
  };

  const handleAccountChange = (value?: Options) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      id_account: value?.value || null,
    }));
  };

  const handleDepartmentChange = (value?: Options) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      id_department: value?.value || null,
    }));
  };

  const handleBranchChange = (value?: Options) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      id_branch: value?.value || null,
    }));
  };

  const handlePositionChange = (value?: Options) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      id_position: value?.value || null,
    }));
  };

  useEffect(() => {
    listSelects();
  }, []);

  const optionsAccount = accounts.map((account) => ({
    value: account.id,
    label: account.username,
  }));

  const optionsDepartment = departaments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const optionsBranch = branches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const optionsPosition = positions.map((position) => ({
    value: position.id,
    label: position.name,
  }));

  async function listSelects() {
    try {
      const responseAccount = await api.get("/account/listausuario/vazio");
      setAcconts(responseAccount.data.accounts);
      const responseDepartment = await api.get("/department/listadepartamento");
      setDepartaments(responseDepartment.data.departments);
      const responseBranch = await api.get("/branch/listafilial");
      setBranches(responseBranch.data.branches);
      const responsePosition = await api.get("/position/listaposicao");
      setPositions(responsePosition.data.positions);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function addEmployee() {
    const body = {
      name: employee.name,
      date_of_birth: formatDateForDb(employee.date_of_birth),
      cpf: formatCPFForDb(employee.cpf),
      phone: formatPhoneForDb(employee.phone),
      phone_contact: formatPhoneForDb(employee.phone_contact),
      id_account: employee.id_account,
      id_branch: employee.id_branch,
      id_position: employee.id_position,
      id_department: employee.id_department,
      gender: employee.gender,
      address: employee.address,
      medical_condition: employee.medical_condition,
      regular_medication: employee.regular_medication,
      allergy: employee.allergy,
      blood_type: employee.blood_type,
      date_of_hire: formatDateForDb(employee.date_of_hire)
    };
    try {
      setLoading(true);
      await api.post("/employee/cadastrofuncionario", body);
      onEmployeeAdded();
      clearInputs();
      setShowModal(false);
      toast.success("Funcionário cadastrado com sucesso!");
      setLoading(false);
    } catch (err) {
      toast.error("Erro ao cadastrar funcionário. Tente novamente!");
      setLoading(false);
    }
  }

  function clearInputs() {
    setEmployee({
      name: "",
      date_of_birth: "",
      cpf: "",
      phone: "",
      phone_contact: "",
      id_account: null,
      id_branch: null,
      id_department: null,
      id_position: null,
      address: "",
      allergy: "",
      medical_condition: "",
      regular_medication: "",
      blood_type: "",
      date_of_hire: ""
    });
  }

  const formatPhoneForDb = (phone: string) => {
    const phoneOnlyNumbers = phone.replace(/\D/g, "");
    return phoneOnlyNumbers;
  };

  const formatCPFForDb = (cpf: string) => {
    const cpfOnlyNumbers = cpf.replace(/\D/g, "");
    return cpfOnlyNumbers;
  };

  const formatDateForDb = (date: string) => {
    const parts = date.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div
        className="2xl:w-60 2xl:h-12 flex justify-between items-center 2xl:text-xl text-blue-400 2xl:py-2 2xl:px-4 xl:gap-2 xl:px-2 xl:py-1 2xl:rounded-md xl:rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">
          Adicionar Funcionario
        </p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center 2xl:h-20 2xl:min-h-20 text-3xl xl:text-2xl xl:h-16 xl:min-h-20 text-gray-600 border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Funcionário</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <i
                  className="fas fa-times"
                  onClick={() => {
                    setShowModal(false);
                    clearInputs();
                  }}
                ></i>
              </button>
            </div>
            <div className="flex w-full h-full flex-col items-center justify-start py-4 overflow-y-auto ">
              <div className="flex flex-col items-center justify-start gap-10 w-full">
                <div className="flex w-11/12 h-full justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <InputText
                      width="w-full"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Nome"
                      type="text"
                      input={employee.name}
                      setInput={handleNameChange}
                    />
                  </div>{" "}
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={employee.date_of_birth}
                      placeholder="Data de Nascimento"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "") //
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{4}).*/, "$1");

                        setEmployee((prev) => ({
                          ...prev,
                          date_of_birth: formatted,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={employee.cpf}
                        placeholder="CPF"
                        maxLength={14}
                        className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                        onChange={(e) => {
                          const value = e.target.value;

                          const formatted = value
                            .replace(/\D/g, "")
                            .replace(/(\d{3})(\d)/, "$1.$2")
                            .replace(/(\d{3})(\d)/, "$1.$2")
                            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

                          setEmployee((prev) => ({ ...prev, cpf: formatted }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <input
                      type="text"
                      value={employee.phone}
                      placeholder="Telefone"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "")
                          .replace(/(\d{2})(\d)/, "($1)$2")
                          .replace(/(\d{5})(\d)/, "$1-$2")
                          .replace(/(-\d{4})\d+?$/, "$1");

                        setEmployee((prev) => ({
                          ...prev,
                          phone: formatted,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={employee.phone_contact}
                      placeholder="Telefone de Contato"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "")
                          .replace(/(\d{2})(\d)/, "($1)$2")
                          .replace(/(\d{5})(\d)/, "$1-$2")
                          .replace(/(-\d{4})\d+?$/, "$1");

                        setEmployee((prev) => ({
                          ...prev,
                          phone_contact: formatted,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 h-full justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <InputText
                      width="w-full"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Endereço"
                      type="text"
                      input={employee.address ?? ""}
                      setInput={handleAddressChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <input
                      type="text"
                      value={employee.date_of_hire ?? ""}
                      placeholder="Data de Entrada"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "") //
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{4}).*/, "$1");

                        setEmployee((prev) => ({
                          ...prev,
                          date_of_hire: formatted,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="2xl:w-80 xl:w-52"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Alergia"
                      type="text"
                      input={employee.allergy ?? ""}
                      setInput={handleAllergyChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="2xl:w-80 xl:w-52"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Gênero"
                      type="text"
                      input={employee.gender ?? ""}
                      setInput={handleGenderChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="2xl:w-80 xl:w-52"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Tipo Sanguíneo"
                      type="text"
                      input={employee.blood_type ?? ""}
                      setInput={handleBloodChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="2xl:w-80 xl:w-52"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Medicação Contínua"
                      type="text"
                      input={employee.regular_medication ?? ""}
                      setInput={handleRegularMedicationChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="2xl:w-80 xl:w-52"
                      height="2xl:h-16 xl:h-12"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Condição Médica"
                      type="text"
                      input={employee.medical_condition ?? ""}
                      setInput={handleMedicalConditionChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 2xl:px-8 xl:px-5 w-full h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={optionsBranch}
                    value={employee.id_branch}
                    onChange={handleBranchChange}
                    placeholder="Filial"
                    width="full"
                  />
                </div>
                <div className="flex flex-col gap-2 2xl:px-8 xl:px-5 w-full h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={optionsDepartment}
                    value={employee.id_department}
                    onChange={handleDepartmentChange}
                    placeholder="Departamento"
                    width="full"
                  />
                </div>
                <div className="flex flex-col gap-2 2xl:px-8 xl:px-5 w-full h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={optionsPosition}
                    value={employee.id_position}
                    onChange={handlePositionChange}
                    placeholder="Cargo"
                    width="full"
                  />
                </div>
                <div className="flex flex-col gap-2 2xl:px-8 xl:px-5 w-full h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={optionsAccount ?? "Nenhum Usuário Disponível"}
                    value={employee.id_account}
                    onChange={handleAccountChange}
                    placeholder="Usuário"
                    width="full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full 2xl:h-24 2xl:min-h-24 xl:h-20 xl:min-h-20 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 2xl:text-xl xl:text-base font-light flex justify-center items-center text-white rounded-lg 2xl:w-32 2xl:h-12 xl:w-24 xl:h-10 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
                disabled={loading}
                onClick={() => addEmployee()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalEmployee;
