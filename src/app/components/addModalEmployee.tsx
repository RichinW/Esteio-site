import { FC, useEffect, useState } from "react";
import InputText from "./inputText";
import { AccountOut } from "@/type/accountType";
import { EmployeeIn } from "@/type/employeeType";
import SelectDefault from "./Select";
import api from "../services/api";
import { toast } from "react-toastify";

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
  });
  const [accounts, setAcconts] = useState<AccountOut[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNameChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      name: value || "",
    }));
  };

  const handleDateChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      date_of_birth: value || "",
    }));
  };

  const handleCPFChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      cpf: value || "",
    }));
  };

  const handlePhoneChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      phone: value || "",
    }));
  };

  const handleContactPhoneChange = (value?: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      phone_contact: value || "",
    }));
  };

  const handleAccountChange = (value?: Options) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      id_account: value?.value || null,
    }));
  };

  useEffect(() => {
    listAccounts();
  }, []);

  const options = accounts.map((account) => ({
    value: account.id,
    label: account.username,
  }));

  async function listAccounts() {
    try {
      const response = await api.get("/account/listausuario");
      setAcconts(response.data.accounts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function addEmployee() {
    const body = {
      name: employee.name,
      date_of_birth: employee.date_of_birth,
      cpf: employee.cpf,
      phone: employee.phone,
      phone_contact: employee.phone_contact,
      id_account: employee.id_account,
    };
    try {
      setLoading(true);
      const response = await api.post("/employee/cadastrofuncionario", body);
      onEmployeeAdded();
      clearInputs();
      setShowModal(false);
      toast.success(response.data.message);
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
    });
  }

  return (
    <>
      <div
        className="w-72      h-12 flex justify-between items-center text-xl text-blue-400 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
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
            <div className="w-full flex justify-between items-center h-20 min-h-20 text-3xl text-gray-600  border-b-2 border-gray-100">
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
            <div className="flex w-full h-full flex-col items-center justify-start pt-4">
              <div className="flex flex-col items-center justify-start gap-10 w-full">
                <div className="flex w-11/12 h-full justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <InputText
                      width="full"
                      placeholder="Nome"
                      type="text"
                      input={employee.name}
                      setInput={handleNameChange}
                    />
                  </div>{" "}
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Data de nascimento"
                      type="date"
                      input={employee.date_of_birth}
                      setInput={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <InputText
                        width="80"
                        placeholder="CPF"
                        type="text"
                        input={employee.cpf}
                        setInput={handleCPFChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="80"
                      placeholder="Tefone"
                      type="text"
                      input={employee.phone}
                      setInput={handlePhoneChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Telefone de Contato"
                      type="text"
                      input={employee.phone_contact}
                      setInput={handleContactPhoneChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    options={options}
                    value={employee.id_account}
                    onChange={handleAccountChange}
                    placeholder="Usuário"
                    width="full"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-24 min-h-24 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
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
