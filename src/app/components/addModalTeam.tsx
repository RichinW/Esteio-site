import { FC, useEffect, useState } from "react";
import { TeamIn } from "@/type/teamType";
import { EmployeeOut } from "@/type/employeeType";
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

  function formattedDateFunction(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    return formattedDate;
  }

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
      const response = await api.post("/team/cadastrotime", body);
      onTeamAdded();
      setShowModal(false)
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Erro ao cadastrar funcionário. Tente novamente!");
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
        className="w-48 h-12 flex justify-between items-center text-xl text-blue-400 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">Adicionar Time</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center h-20 min-h-20 text-3xl text-gray-600  border-b-2 border-gray-100">
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
                    options={options}
                    value={team.employee_one}
                    onChange={handleEmployeeOneChange}
                    placeholder="Primeiro Funcionário"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    options={options}
                    value={team.employee_two}
                    onChange={handleEmployeeTwoChange}
                    placeholder="Segundo Funcionário"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-24 min-h-24 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
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
