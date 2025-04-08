import { EmployeeOut } from "@/type/employeeType";
import { FC, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import DeleteNotificationModal from "./deleteNotificationModal";

interface ObjEmployee {
  employee: EmployeeOut;
  returnEvent: () => {};
}

const InfoEmployeeModal: FC<ObjEmployee> = ({ employee, returnEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [pageOption, setPageOption] = useState("detalhes");
  const listEmployee = [employee];

  const getFirstTwoNames = (fullName: string) => {
    const names = fullName.split(" ");
    return names.length > 1 ? names.slice(0, 2).join(" ") : names[0];
  };

  const formatCPF = (cpf: string) => {
    if (!cpf) return "";
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return cpf;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return format(date, "dd, MMM - yyyy", { locale: enUS });
  };

  return (
    <>
      <div
        className="w-52 h-12 flex justify-between items-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50 font-rubik">
          <div className="h-full 2xl:w-1/2 xl:w-5/12 bg-gray-100 flex flex-col">
            <div className="w-full py-2 bg-white px-6 flex justify-between items-center">
              <div
                className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => setShowModal(false)}
              >
                <i className="fa-solid fa-arrow-left text-lg"></i>
              </div>
              <div className="flex gap-2">
                <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                  <i className="fa-solid fa-pencil text-lg"></i>
                </div>
                <DeleteNotificationModal
                  name="Funcinário"
                  list={listEmployee}
                  returnEvent={() => returnEvent()}
                  baseRoute="employee"
                  apiRoute="deletefuncionario"
                  trigger={
                    <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                      <i className="fa-solid fa-trash-can text-lg"></i>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="w-full flex justify-start px-6 2xl:py-8 xl:py-4">
              <div className="flex justify-start items-center gap-6 w-full">
                <i className="fa-solid fa-circle-user 2xl:text-9xl xl:text-8xl text-gray-700"></i>
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex flex-col justify-start items-start border-b-2 2xl:gap-2 xl:gap-1 2xl:pb-4 xl:pb-2 border-gray-300 w-full">
                    <p className="2xl:text-2xl xl:text-base text-gray-700 font-semibold">
                      {getFirstTwoNames(employee.name) || "Não informado"}
                    </p>
                    <div className="flex justify-center items-center 2xl:gap-3 xl:gap-1">
                      <div
                        className={`2xl:w-16 2xl:h-6 xl:w-12 xl:h-5 border-2 ${
                          employee.active
                            ? "border-green-500 text-green-500"
                            : "border-red-500 text-red-500"
                        } 2xl:rounded-md xl:rounded flex justify-center items-center 2xl:text-base xl:text-sm `}
                      >
                        {employee.active ? "Sim" : "Não"}
                      </div>
                      <p className="w-1 h-1 bg-slate-400 rounded-full"></p>
                      <p className="2xl:text-base xl:text-sm font-medium">
                        {employee.position?.name || "Não informado"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-start 2xl:pt-4 xl:pt-2 2xl:gap-6 xl:gap-4">
                    <div className="flex 2xl:w-52 xl:w-40 justify-between items-center 2xl:text-base xl:text-xs">
                      <div className="flex flex-col items-start 2xl:font-semibold xl:font-medium">
                        <p className="">Equipe:</p>
                        <p className="">Entrada:</p>
                      </div>
                      <div className="flex flex-col items-start text-gray-700 ">
                        <p className="">
                          {employee.branch?.name || "Não informado"}
                        </p>
                        <p className="">
                          {formatDate(employee.date_of_hire) || "Não informado"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start xl:text-xs 2xl:text-base ">
                      <div className="flex justify-start items-center gap-2 text-gray-700">
                        <i className="fa-solid fa-envelope"></i>
                        <p className="">
                          {employee.account.email || "Não informado"}
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-2 text-gray-700">
                        <i className="fa-solid fa-phone"></i>
                        <p className="">{employee.phone || "Não informado"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col max-h-screen min-h-screen bg-white">
              <div className="2xl:h-16 mb-2 xl:h-12 w-full font-bold 2xl:border-b-4 xl:border-b-2 border-gray-100 flex 2xl:gap-3 xl:gap-2 justify-start items-center 2xl:px-16 xl:px-12 2xl:text-base xl:text-sm">
                <p
                  className={`2xl:px-6 xl:px-3 h-full flex justify-center items-center cursor-pointer ${
                    pageOption === "detail"
                      ? "border-b-2 border-yellow-400 text-gray-700 "
                      : "text-gray-500 "
                  }`}
                  onClick={() => setPageOption("detail")}
                >
                  DETALHES
                </p>
                {/* <p
                  className={`2xl:px-6 xl:px-3 h-full flex justify-center items-center cursor-pointer ${
                    pageOption === "resumo"
                      ? "border-b-2 border-yellow-400 text-gray-700 "
                      : "text-gray-500 "
                  }`}
                  onClick={() => setPageOption("resumo")}
                >
                  RESUMO
                </p> */}
              </div>
              {pageOption === "detail" && (
                <div className="w-full xl:h-96 flex-col overflow-y-auto flex items-center justify-center py-4">
                  <div className="flex flex-col h-full gap-2">
                    <div className="w-11/12 h-auto border-2 rounded-md flex flex-col items-center pb-4">
                      <div className="w-full h-12 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                        Informações Pessoais
                      </div>
                      <div className="w-full flex justify-between items-start">
                        <div className="flex flex-col gap-6 w-52">
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Nome Inteiro
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.name || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">CPF</p>
                                <p className="text-xs text-gray-700">
                                  {formatCPF(employee.cpf) || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">Gênero</p>
                                <p className="text-xs text-gray-700">
                                  {employee.gender || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Endereço
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.address || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-6 w-52">
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Tipo Sanguíneo
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.blood_type || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Portador de Doença
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.medical_condition ||
                                    "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Medicação Constante
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.regular_medication ||
                                    "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Alérgico
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.allergy || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-11/12 h-auto border-2 rounded-md flex flex-col pb-4">
                      <div className="w-full h-12 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                        Informações Profissionais
                      </div>
                      <div className="w-full flex justify-between items-start">
                        <div className="flex flex-col gap-6 w-52">
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">Cargo</p>
                                <p className="text-xs text-gray-700">
                                  {employee.position?.name || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">Filial</p>
                                <p className="text-xs text-gray-700">
                                  {employee.branch?.name || "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">Entrada</p>
                                <p className="text-xs text-gray-700">
                                  {formatDate(employee.date_of_hire) ||
                                    "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400"></p>
                                <p className="text-xs text-gray-700"></p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-6 w-52">
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">
                                  Departamento
                                </p>
                                <p className="text-xs text-gray-700">
                                  {employee.department?.name ||
                                    "Sem informações"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400">Ativo</p>
                                <p className="text-xs text-gray-700">
                                  {employee.active ? "Sim" : "Não"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400"></p>
                                <p className="text-xs text-gray-700"></p>
                              </div>
                            </div>
                          </div>
                          <div className="flex px-6 w-full justify-between items-center h-10">
                            <div className="flex flex-col gap-4 justify-start items-start">
                              <div className="flex flex-col font-semibold">
                                <p className="text-xs text-gray-400"></p>
                                <p className="text-xs text-gray-700"></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoEmployeeModal;
