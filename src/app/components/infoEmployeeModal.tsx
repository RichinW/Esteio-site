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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
          <div className="h-full w-1/2 bg-gray-100 flex flex-col">
            <div className="w-full h-20 bg-white px-6 flex justify-between items-center">
              <div
                className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <i className="fa-solid fa-arrow-left text-lg"></i>
              </div>
              <div className="flex gap-2">
                <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer">
                  <i className="fa-solid fa-pencil text-lg"></i>
                </div>
                <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer">
                  <i className="fa-solid fa-trash-can text-lg"></i>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-start px-6 py-8">
              <div className="flex justify-start items-start gap-6 w-full">
                <i className="fa-solid fa-circle-user text-9xl text-gray-700"></i>
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex flex-col justify-start items-start border-b-2 gap-2 pb-4 border-gray-300 w-full">
                    <p className="text-2xl text-gray-700 font-semibold">
                      Richard Walace
                    </p>
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-16 h-6 border-2 border-green-500 rounded-md flex justify-center items-center text-base text-green-500">
                        Ativo
                      </div>
                      <p className="w-1 h-1 bg-slate-400 rounded-full"></p>
                      <p className="text-base font-medium">Auxiliar Técnico</p>
                    </div>
                  </div>
                  <div className="w-full flex justify-start items-start pt-4 gap-6">
                    <div className="flex w-52 justify-between items-center">
                      <div className="flex flex-col items-start">
                        <p className="text-base font-semibold">Equipe: </p>
                        <p className="text-base font-semibold">Entrada: </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-gray-700 text-base">Bauru</p>
                        <p className="text-gray-700 text-base">
                          22, Marc - 2025
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex justify-start items-center gap-2">
                        <i className="fa-solid fa-envelope text-gray-700"></i>
                        <p className="text-base text-gray-700">
                          richardwalace2020@gmail.com
                        </p>
                      </div>
                      <div className="flex justify-start items-center gap-2">
                        <i className="fa-solid fa-phone text-gray-700"></i>
                        <p className="text-base text-gray-700">
                          (14) 99646-3458
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col h-full bg-white">
              <div className="h-16 w-full font-bold border-b-4 border-gray-100 flex gap-3 justify-start items-center px-16 text-base">
                <p
                  className={`px-6 h-full flex justify-center items-center ${
                    pageOption === "detalhes"
                      ? "border-b-2 border-yellow-400 text-gray-700 "
                      : "text-gray-500 "
                  }`}
                  onClick={() => setPageOption("detalhes")}
                >
                  DETALHES
                </p>
                <p
                  className={`px-6 h-full flex justify-center items-center ${
                    pageOption === "resumo"
                      ? "border-b-2 border-yellow-400 text-gray-700 "
                      : "text-gray-500 "
                  }`}
                  onClick={() => setPageOption("resumo")}
                >
                  RESUMO
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoEmployeeModal;
