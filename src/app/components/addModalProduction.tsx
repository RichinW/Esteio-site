import { useState } from "react";
import VerificationModal from "./verificationModal";
import api from "../services/api";

const AddModalProduction = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  async function AddMessage() {
    const body = {
      message: message,
      type: type,
    };
    try {
      const response = await api.post("/cadastroproducao", body);
      console.log("Resposta da API:", response.data);
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
    }
  }

  return (
    <>
      <div
        className="2xl:w-60 2xl:h-12 flex justify-between items-center 2xl:text-xl text-blue-400 2xl:py-2 2xl:px-4 xl:gap-2 xl:px-2 xl:py-1 2xl:rounded-md xl:rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p>Adicionar Produção</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center 2xl:h-20 2xl:min-h-20 text-3xl xl:text-2xl xl:h-16 xl:min-h-20 text-gray-600 border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Diario</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex w-full h-full flex-col pt-4 justify-between">
              <div className="flex justify-between items-center h-2/4">
                <div className="mx-6 flex flex-col gap-2 text-gray-600 w-2/4 h-full">
                  <p className="text-xl font-medium">
                    Passos para realizar o cadastro:
                  </p>
                  <div className="flex flex-col gap-4">
                    <p>- Adicionar a mensagem</p>
                    <p>- Adicionar a Atividade</p>
                    <p>- Verificar as informações</p>
                    <p>- Finalizar o cadastro</p>
                  </div>
                </div>
                <div className="w-2/4 h-full flex justify-center items-end">
                  <div className="flex justify-center items-center">
                    <p
                      className={`w-14 h-10 ${
                        type === "SV"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      } font-semibold  flex justify-center items-center cursor-pointer rounded-t-md hover:bg-blue-500 hover:text-white transition-all`}
                      onClick={() => setType("SV")}
                    >
                      SV
                    </p>
                    <p
                      className={`w-14 h-10 ${
                        type === "SH"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      } font-semibold flex justify-center items-center cursor-pointer rounded-t-md hover:bg-blue-500 hover:text-white transition-all`}
                      onClick={() => setType("SH")}
                    >
                      SH
                    </p>
                    <p
                      className={`w-14 h-10 ${
                        type === "DISP"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      } font-semibold flex justify-center items-center cursor-pointer rounded-t-md hover:bg-blue-500 hover:text-white transition-all`}
                      onClick={() => setType("DISP")}
                    >
                      DISP
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                className="focus:outline-none bg-gray-100 px-6 rounded-md resize-none py-4 text-gray-500 h-3/4"
                name="text-message"
                id="text-message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Coloque a mensagem aqui..."
              ></textarea>
            </div>
            <div className="w-full h-24 flex justify-end items-center p-6 gap-4">
              <VerificationModal />
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
                onClick={() => AddMessage()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalProduction;
