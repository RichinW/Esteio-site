import { useState } from "react";

const InfoEmployeeModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [pageOption, setPageOption] = useState("detalhes");

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
            <div className="w-full h-20 bg-white px-6 flex justify-between items-center">
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
                <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                  <i className="fa-solid fa-trash-can text-lg"></i>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-start px-6 2xl:py-8 xl:py-4">
              <div className="flex justify-start items-center gap-6 w-full">
                <i className="fa-solid fa-circle-user 2xl:text-9xl xl:text-8xl text-gray-700"></i>
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex flex-col justify-start items-start border-b-2 2xl:gap-2 xl:gap-1 2xl:pb-4 xl:pb-2 border-gray-300 w-full">
                    <p className="2xl:text-2xl xl:text-base text-gray-700 font-semibold">
                      Richard Walace
                    </p>
                    <div className="flex justify-center items-center 2xl:gap-3 xl:gap-1">
                      <div className="2xl:w-16 2xl:h-6 xl:w-12 xl:h-5 border-2 border-green-500 2xl:rounded-md xl:rounded flex justify-center items-center 2xl:text-base xl:text-sm text-green-500">
                        Ativo
                      </div>
                      <p className="w-1 h-1 bg-slate-400 rounded-full"></p>
                      <p className="2xl:text-base xl:text-sm font-medium">
                        Auxiliar Técnico
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-start 2xl:pt-4 xl:pt-2 2xl:gap-6 xl:gap-4">
                    <div className="flex 2xl:w-52 xl:w-40 justify-between items-center">
                      <div className="flex flex-col items-start 2xl:text-base xl:text-sm 2xl:font-semibold xl:font-medium">
                        <p className="">Equipe:</p>
                        <p className="">Entrada:</p>
                      </div>
                      <div className="flex flex-col items-start text-gray-700 2xl:text-base xl:text-sm">
                        <p className="">Bauru</p>
                        <p className="">22, Marc - 2025</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex justify-start items-center gap-2 2xl:text-base xl:text-sm text-gray-700">
                        <i className="fa-solid fa-envelope"></i>
                        <p className="">richardwalace2020@gmail.com</p>
                      </div>
                      <div className="flex justify-start items-center gap-2 2xl:text-base xl:text-sm text-gray-700">
                        <i className="fa-solid fa-phone"></i>
                        <p className="">(14) 99646-3458</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col min-h-screen bg-white">
              <div className="2xl:h-16 xl:h-12 w-full font-bold 2xl:border-b-4 xl:border-b-2 border-gray-100 flex 2xl:gap-3 xl:gap-2 justify-start items-center 2xl:px-16 xl:px-12 2xl:text-base xl:text-sm">
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
                <p
                  className={`2xl:px-6 xl:px-3 h-full flex justify-center items-center cursor-pointer ${
                    pageOption === "resumo"
                      ? "border-b-2 border-yellow-400 text-gray-700 "
                      : "text-gray-500 "
                  }`}
                  onClick={() => setPageOption("resumo")}
                >
                  RESUMO
                </p>
              </div>
              {pageOption === "detail" && (
                <div className="w-full flex-col overflow-y-auto items-center justify-center">
                <div className="w-11/12 h-5/6 border-2 rounded-md flex flex-col items-center">
                    <div className="w-full h-16 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                      Informações Pessoais
                    </div>
                    <div className="w-full flex justify-between items-start">
                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Nome Inteiro
                              </p>
                              <p className="text-xs text-gray-700">
                                Richard Walace de Oliveira Camargo
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">CPF</p>
                              <p className="text-xs text-gray-700">
                                532.001.218-74
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Gênero</p>
                              <p className="text-xs text-gray-700">Masculino</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Endereço</p>
                              <p className="text-xs text-gray-700">
                                R. Aviador Edu Chaves, 4-53 - Jardim América -
                                Bauru/SP
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Tipo Sanguíneo
                              </p>
                              <p className="text-xs text-gray-700">
                                O-
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Portador de Doença</p>
                              <p className="text-xs text-gray-700">
                                Não
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Medicação Constante</p>
                              <p className="text-xs text-gray-700">Não</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Alérgico</p>
                              <p className="text-xs text-gray-700">
                                Sim (Rinite)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="w-11/12 h-5/6 border-2 rounded-md flex flex-col">
                    <div className="w-full h-1/6 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                      Informações Pessoais
                    </div>
                    <div className="w-full flex justify-between items-start">
                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Nome Inteiro
                              </p>
                              <p className="text-xs text-gray-700">
                                Richard Walace de Oliveira Camargo
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">CPF</p>
                              <p className="text-xs text-gray-700">
                                532.001.218-74
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Gênero</p>
                              <p className="text-xs text-gray-700">Masculino</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Endereço</p>
                              <p className="text-xs text-gray-700">
                                R. Aviador Edu Chaves, 4-53 - Jardim América -
                                Bauru/SP
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Tipo Sanguíneo
                              </p>
                              <p className="text-xs text-gray-700">
                                O-
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Portador de Doença</p>
                              <p className="text-xs text-gray-700">
                                Não
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Medicação Constante</p>
                              <p className="text-xs text-gray-700">Não</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Alérgico</p>
                              <p className="text-xs text-gray-700">
                                Sim (Rinite)
                              </p>
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
