import { AddModalProps, Diario } from "@/type/types";
import { useState } from "react";

const VerificationModal = () => {
  const [showModal, setShowModal] = useState(false);

  const AddMessage = () => {};

  return (
    <>
      <div
        className="text-xl font-medium text-gray-700 flex justify-center items-center rounded-lg w-32 h-12 border-2 border-gray-300 cursor-pointer hover:bg-gray-300 hover:text-white transition-all"
        onClick={() => setShowModal(true)}
      >
        <p>Verificar</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center h-20 text-3xl text-gray-600  border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-magnifying-glass"></i>
                <p className="font-medium">Verificador de Diario</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="h-full w-full flex justify-start items-center py-4 rounded-md flex-col">
              <div className="w-full h-16 border-b-2 border-gray-100 flex justify-between items-center text-gray-700 font-medium text-lg">
                <div className="flex items-center gap-2">
                  <p>Data</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Auditoria</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Regional</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Rodovia</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>KM Inicial</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>KM Final</p>
                </div>
                <div></div>
              </div>
              <div className="w-full h-16 flex justify-between items-center text-gray-400 text-lg">
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
                <div className="flex items-center"></div>
              </div>
            </div>
            <div className="w-full h-20 flex justify-end border-t-2 border-gray-100 items-center p-6 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Verificar"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationModal;
