import { FC, useRef, useState } from "react";
import { format } from "date-fns";
import { ProductionOut } from "@/type/producaoType";
import ButtonDefault from "./buttonDefault";
import api from "../services/api";
import { toast } from "react-toastify";
import DeleteNotificationModal from "./deleteNotificationModal";

interface ObjProduction {
  productions: ProductionOut[];
  currentProductionId: number;
  returnEvent: () => {};
}

const InfoProductionModal: FC<ObjProduction> = ({
  productions,
  currentProductionId,
  returnEvent,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [checking, setChecking] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentId, setCurrentId] = useState(currentProductionId);
  const [isLoading, setIsLoading] = useState(false)
  const currentIndex = productions.findIndex((p) => p.id === currentId);
  const [editMode, setEditMode] = useState(false);
  const production = productions[currentIndex];
  const productionList = [production];
  const [amount, setAmount] = useState<number | null>(
    production.verified_amount ?? null
  );

  async function alterStateVerifiation() {
    try {
      setIsLoading(true)
      const response = await api.put(
        `/production/editarproducao/alterarverificacao/${currentId}`,
        {
          verification_status:
            amount === production.total_elements ? "Certo" : "Errado",
          verified_amount: amount,
        }
      );
      toast.success(response.data.message);
      setShowModal(false);
      setChecking(false);
      setIsLoading(false)
      returnEvent();
    } catch (err) {
      toast.error("Erro ao adicionar verificação!");
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentId(productions[currentIndex - 1].id);
    }
  };

  const goNext = () => {
    if (currentIndex < productions.length - 1) {
      setCurrentId(productions[currentIndex + 1].id);
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
    setChecking(!checking);
  };

  const formatKM = (km: number) => {
    if (!km && km !== 0) return "";

    if (isNaN(km)) return "";

    const kmInt = Math.floor(km);
    const kmDecimal = Math.round((km - kmInt) * 1000);

    return `${String(kmInt).padStart(3, "0")}+${String(kmDecimal).padStart(
      3,
      "0"
    )}`;
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
              <div className="flex justify-center items-center gap-1">
                <button
                  className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                >
                  <i className="fa-solid fa-arrow-left text-lg"></i>
                </button>
                <button
                  className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={goNext}
                  disabled={currentIndex === productions.length - 1}
                >
                  <i className="fa-solid fa-arrow-right text-lg"></i>
                </button>
                <button
                  className="px-3 py-2  flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>
              <div className="flex gap-2">
                <div
                  className={`p-2 flex justify-center items-center rounded-md border-2 cursor-pointer ${
                    editMode
                      ? "border-blue-600 bg-blue-500 hover:bg-blue-600 text-white"
                      : "border-gray-100 hover:bg-gray-100"
                  } transition-all`}
                  onClick={() => setEditMode(!editMode)}
                >
                  <i className="fa-solid fa-pencil text-lg"></i>
                </div>
                <DeleteNotificationModal
                  name="Produção"
                  list={productionList}
                  returnEvent={() => returnEvent()}
                  baseRoute="production"
                  apiRoute="deleteproducao"
                  trigger={
                    <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                      <i className="fa-solid fa-trash-can text-lg"></i>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="w-full flex justify-start px-6 2xl:py-8 xl:py-4 flex-col gap-3 bg-white border-b-2 border-t-2">
              <div className="flex justify-start gap-2 items-center">
                <p className="xl:text-base xl:font-semibold text-gray-700">
                  Equipe
                </p>
                <div
                  className={`xl:px-2 xl:py-1 rounded-md ${
                    production.mission.active ? "bg-green-400" : "bg-red-500"
                  } text-white flex justify-center items-center`}
                >
                  <p className="xl:text-xs">
                    {production.mission.active ? "Ativo" : "Desativado"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <div className="flex justify-start items-center gap-2">
                  <i className="fa-solid fa-circle-user xl:text-2xl"></i>
                  <p className="xl:text-sm">
                    {production.mission.team.employee_one.name}
                  </p>
                </div>
                {production.mission.team.employee_two && (
                  <div className="flex justify-start items-center gap-2">
                    <i className="fa-solid fa-circle-user xl:text-2xl"></i>
                    <p className="xl:text-sm">
                      {production.mission.team.employee_two.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col max-h-screen min-h-screen items-center pt-4 bg-white overflow-y-auto">
              <div className="w-11/12 h-auto border-2 rounded-md flex flex-col items-center pb-4">
                <div className="w-full h-12 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                  Informações de Produção
                </div>
                <div className="w-full flex justify-between items-start">
                  <div className="flex flex-col gap-6 w-52">
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Data</p>
                          <p>
                            {(() => {
                              const [y, m, d] = production.date;
                              const date = new Date(
                                parseInt(y),
                                parseInt(m) - 1,
                                parseInt(d)
                              );
                              return date.toLocaleDateString("pt-BR");
                            })()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Auditoria</p>
                          <p className="text-xs text-gray-700">
                            {production.mission.audit}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Rodovia</p>
                          <p className="text-xs text-gray-700">
                            {production.highway.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Km Inicial</p>
                          <p className="text-xs text-gray-700">
                            {formatKM(production.km_start)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">
                            Quantia de Elementos
                          </p>
                          <p className="text-xs text-gray-700">
                            {production.total_elements}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 w-52">
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Tipo</p>
                          <p className="text-xs text-gray-700">
                            {production.mission.type}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Regional</p>
                          <p className="text-xs text-gray-700">
                            {production.mission.regional.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">
                            Situção da Rodovia
                          </p>
                          <p className="text-xs text-gray-700">
                            {production.state_highway}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">Km Final</p>
                          <p className="text-xs text-gray-700">
                            {formatKM(production.km_end)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex px-6 w-full justify-between items-center h-10">
                      <div className="flex flex-col gap-4 justify-start items-start">
                        <div className="flex flex-col font-semibold">
                          <p className="text-xs text-gray-400">
                            Quantidade Verificada
                          </p>
                          <div className="flex justify-start items-center gap-2">
                            <input
                              ref={inputRef}
                              type="number"
                              value={amount ?? ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                setAmount(value === "" ? null : Number(value));
                              }}
                              placeholder="Não Verificado"
                              disabled={checking}
                              className="outline-none xl:text-xs placeholder:text-gray-400 disabled:bg-white text-gray-700 xl:w-20 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                            />
                            <i
                              className={`fa-solid fa-pencil xl:text-sm transition-all ${
                                checking
                                  ? "text-gray-400 hover:text-gray-700"
                                  : "text-gray-700 hover:text-gray-400"
                              }`}
                              onClick={handleFocus}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-6">
                      <ButtonDefault
                        text="Salvar"
                        bgColor="bg-blue-500"
                        hover="hover:bg-blue-600"
                        onClick={() => alterStateVerifiation()}
                        disabled={amount === production.verified_amount || isLoading}
                        width="xl:w-24"
                        height="xl:h-9"
                        fontSize="xl:text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoProductionModal;
