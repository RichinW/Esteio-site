import { DeleteModal } from "@/type/types";
import { FC, useState } from "react";
import ButtonDefault from "./buttonDefault";
import { toast } from "react-toastify";
import api from "../services/api";

const DeleteNotificationModal: FC<DeleteModal> = ({
  name,
  returnEvent,
  list,
  apiRoute,
  baseRoute,
  trigger,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = async () => {
    if (list.length <= 0) {
      toast.info("Selecione algum item para deletar");
    } else {
      try {
        setIsLoading(true);
        for (const item of list) {
          await api.delete(`/${baseRoute}/${apiRoute}/${item.id}`);
        }
        toast.success("Items excluídas com sucesso!");
        setIsLoading(false);
        setShowModal(false);
        returnEvent();
      } catch (error) {
        toast.error("Erro ao tentar deletar as items");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div
        className="flex justify-between gap-2 items-center 2xl:text-lg xl:text-base cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {trigger}
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
                  Deletar {name}?
                </p>
                <p className="text-center px-5 text-gray-400">
                  Tem certeza que deseja deletar? Você não poderá mais ve-la
                  novamente.
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
                  text="Deletar"
                  bgColor="bg-red-500"
                  onClick={() => deleteItem()}
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

export default DeleteNotificationModal;
