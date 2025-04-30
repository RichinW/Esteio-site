import { FC, useEffect, useState } from "react";
import { TeamIn } from "@/type/equipeType";
import { EmployeeOut } from "@/type/funcionarioType";
import SelectDefault from "./Select";
import api from "../services/api";
import { toast } from "react-toastify";

interface Options {
  label: string;
  value: number;
}

interface AddModalTeamProps {
  onTeamAdded: () => void;
}

const AddModalTeam: FC<AddModalTeamProps> = ({ onTeamAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState<TeamIn>({
    employee_one: null,
    employee_two: null,
    date_register: "",
  });
  const [employees, setEmployees] = useState<EmployeeOut[]>([]);
  const [loading, setLoading] = useState(true);

  const handleEmployeeOneChange = (value?: Options) => {
    setTeam((prevEmployee) => ({
      ...prevEmployee,
      employee_one: value?.value || null,
    }));
  };

  const handleEmployeeTwoChange = (value?: Options) => {
    setTeam((prevEmployee) => ({
      ...prevEmployee,
      employee_two: value?.value || null,
    }));
  };

  useEffect(() => {
    listEmployees();
  }, []);

  const options = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));

  async function listEmployees() {
    try {
      const response = await api.get("/employee/listafuncionario");
      setEmployees(response.data.employees);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function addTeam() {
    const body = {
      id_employee_one: team.employee_one,
      id_employee_two: team.employee_two,
    };
    try {
      setLoading(true);
      const response = await api.post("/team/cadastrotime", body);
      onTeamAdded();
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
    setTeam({
      employee_one: null,
      employee_two: null,
    });
  }

  return (
    <>
      <div
        className="2xl:w-60 2xl:h-12 flex justify-between items-center 2xl:text-xl text-blue-400 2xl:py-2 2xl:px-4 xl:gap-2 xl:px-2 xl:py-1 2xl:rounded-md xl:rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">Adicionar Time</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center 2xl:h-20 2xl:min-h-20 text-3xl xl:text-2xl xl:h-16 xl:min-h-20 text-gray-600 border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Time</p>
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
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={options}
                    value={team.employee_one}
                    onChange={handleEmployeeOneChange}
                    placeholder="Primeiro Funcionário"
                    width="full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    style="custom"
                    height="46"
                    options={options}
                    value={team.employee_two}
                    onChange={handleEmployeeTwoChange}
                    placeholder="Segundo Funcionário"
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
                onClick={() => addTeam()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalTeam;
