import { ToggleButtonProps } from "@/type/types";
import { FC, useState } from "react";
import ButtonDefault from "./buttonDefault";
import { toast } from "react-toastify";
import api from "../services/api";
import axios from "axios";

const ToggleButton: FC<ToggleButtonProps> = ({ state, id, returnEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleItem = async () => {
    try {
      setIsLoading(true);
      await api.put(`/mission/editarmissao/alterarestado/${id}`, {});
      toast.success("Estado alterado com sucesso!");
      setIsLoading(false);
      setShowModal(false);
      returnEvent();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error("Missão não encontrada");
        } else {
          toast.error("Erro ao tentar alterar o estado");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`w-16 rounded-3xl h-8 flex p-1 transition-all ${
          state ? "bg-green-400 justify-end" : "bg-gray-200 justify-start"
        } items-center cursor-pointer`}
      >
        <div
          className="w-6 h-6 rounded-full bg-white"
          onClick={() => setShowModal(true)}
        ></div>
      </div>
      {showModal && (
        <div className="absolute h-screen top-0 left-0 w-screen bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="w-4/12 h-3/6 bg-white rounded-xl flex flex-col justify-center items-center p-5">
            <div className="w-full flex flex-col justify-center gap-6 items-center h-full">
              <div className="p-2 bg-red-200 flex h-12 w-12 rounded-full justify-center items-center">
                <div className="xl:w-6 xl:h-6 border-2 border-red-500 rounded-full flex justify-center items-center text-red-500">
                  <i className="fa-solid fa-exclamation text-red-500 xl:text-sm"></i>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-black xl:text-xl font-extralight">
                  {state ? "Desabilar" : "Habilitar"} Rota?
                </p>
                <p className="text-center px-5 text-gray-400">
                  Tem certeza que deseja {state ? "desabilar" : "habilitar"}?
                </p>
              </div>
              <div className="w-full flex justify-between items-center px-5">
                <ButtonDefault
                  width="xl:w-44"
                  height="xl:h-12"
                  text="Cancelar"
                  bgColor="bg-gray-300"
                  onClick={() => setShowModal(false)}
                  fontSize="xl:text-base text-gray-600"
                  hover="hover:bg-gray-400"
                  disabled={isLoading}
                />
                <ButtonDefault
                  width="xl:w-44"
                  height="xl:h-12"
                  text={state ? "Desabilar" : "Habilitar"}
                  bgColor={state ? "bg-red-500" : "bg-green-500"}
                  onClick={() => toggleItem()}
                  fontSize="xl:text-base text-white"
                  hover="hover:bg-red-600"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToggleButton;
