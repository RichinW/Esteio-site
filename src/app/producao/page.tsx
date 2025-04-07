"use client";
import { useEffect, useState } from "react";
import { ProductionOut } from "@/type/productionType";
import AddModalProduction from "../components/addModalProduction";
import api, { verifyToken, getMe } from "../services/api";
import { useRouter } from "next/navigation";
import EditModalProduction from "../components/editModalProduction";
import FilterModalProduction from "../components/filterModalProduction";
import { toast, ToastContainer } from "react-toastify";
import InfoProductionModal from "../components/infoProductionModal";
import DeleteNotificationModal from "../components/deleteNotificationModal";

export default function Producao() {
  const [productions, setProductions] = useState<ProductionOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [view, setView] = useState<number | null>(null);
  const [selectedProduction, setSelectedProduction] = useState<ProductionOut[]>(
    []
  );
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const pageStart = 7 * (page - 1);
  const pageEnd = 7 * page;
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const get = async () => {
      console.log(await getMe());
    };
    get();
    listProductions();
  }, [router]);

  useEffect(() => {
    listProductions();
  }, [page]);

  async function listProductions() {
    try {
      const response = await api.get(
        `/production/listaproducao/${pageStart}/${pageEnd}`
      );
      setProductions(response.data.productions);
      setTotalPage(Math.ceil(response.data.total_items / 7));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const returnDelete = () => {
    setSelectedProduction([]);
    listProductions();
  }

  const toggleProduction = (newProduction: ProductionOut) => {
    setSelectedProduction((prevState) => {
      const isSelected = prevState.find(
        (production) => production.id === newProduction.id
      );

      if (isSelected) {
        return prevState.filter(
          (production) => production.id !== newProduction.id
        );
      } else {
        return [...prevState, newProduction];
      }
    });
  };

  const toggleAllProduction = (allProductions: ProductionOut[]) => {
    setSelectedProduction((prevState) => {
      if (prevState.length === allProductions.length) {
        return [];
      } else {
        return allProductions;
      }
    });
  };

  const nextPage = () => {
    if (page >= 1 && page <= totalPage) {
      setPage(page + 1);
    }
  };

  const isAllSelected = () => {
    return selectedProduction.length === productions.length;
  };

  const isProductionSelected = (id: number) => {
    return selectedProduction.some((production) => production.id === id);
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
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="h-full w-full flex flex-col">
        <div className="w-full 2xl:h-24 xl:h-16 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold 2xl:text-2xl xl:xl">
            Produção
          </p>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center 2xl:gap-6 xl:gap-3">
          <div className="w-10/12 flex justify-end items-center px-10">
            <AddModalProduction />
          </div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  onClick={() => toggleAllProduction(productions)}
                  className={`2xl:w-5 xl:w-4 xl:h-4 2xl:h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white 2xl:text-sm xl:text-xs"></i>
                  )}
                </div>
                <p className="text-gray-500 2xl:text-xl xl:text-lg font-medium">
                  {selectedProduction.length} Selected
                </p>
              </div>
              <div className="flex justify-between gap-2 items-center 2xl:text-lg xl:text-base cursor-pointer">
                <DeleteNotificationModal
                  name="Produção"
                  list={selectedProduction}
                  returnEvent={() => returnDelete()}
                  baseRoute="production"
                  apiRoute="deleteproducao"
                />
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <FilterModalProduction />
              <div className="flex justify-between items-center gap-2 2xl:text-lg xl:text-base cursor-pointer">
                <i className="fa-solid fa-arrow-down-wide-short text-blue-400"></i>
                <p className="text-gray-400">Ordenar por</p>
              </div>
            </div>
          </div>
          <div className="w-10/12 h-4/5 max-h-4/5 bg-white rounded-lg flex flex-col justify-between px-10 shadow-gray-300 shadow-md">
            <div className="w-full h-full max-h-full flex flex-col justify-start items-center">
              <div className="w-full 2xl:h-20 xl:h-16 border-b-2 2xl:text-base xl:text-sm border-gray-100 flex justify-between items-center text-gray-700 font-bold text-lg">
                <div className="w-[5.5%] flex items-center"></div>
                <div className="w-[4%] flex items-center gap-2">
                  <p>ID</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Data</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Tipo</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Auditoria</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Regional</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Rodovia</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>KM Inicial</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>KM Final</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[4%] flex items-center"></div>
              </div>
              {!loading ? (
                productions.length > 0 ? (
                  productions.map((production) => (
                    <div
                      className={`w-full ${
                        view !== null
                          ? production.id === view
                            ? "2xl:h-40 xl:h-36"
                            : "2xl:h-12 xl:h-8"
                          : "2xl:h-16 xl:h-12"
                      } border-b-2 border-gray-100 flex flex-col gap-3 ${
                        production.verification_status === "Certo"
                          ? "bg-green-200"
                          : production.verification_status === "Errado"
                          ? "bg-red-200"
                          : ""
                      } justify-center items-center text-gray-400 text-lg transition-all`}
                      key={production.id}
                    >
                      <div className="flex w-full justify-between xl:text-sm 2xl:text-base">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div
                            onClick={() => toggleProduction(production)}
                            className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                              isProductionSelected(production.id)
                                ? "bg-blue-400 border-blue-400"
                                : "border-gray-200"
                            }`}
                          >
                            {isProductionSelected(production.id) && (
                              <i className="fa-solid fa-check text-white text-sm"></i>
                            )}
                          </div>
                        </div>
                        <div className="w-[4%] flex items-center">
                          {production.id}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {(() => {
                            const [y, m, d] = production.date.split("-");
                            const date = new Date(
                              parseInt(y),
                              parseInt(m) - 1,
                              parseInt(d)
                            );
                            return date.toLocaleDateString("pt-BR");
                          })()}
                        </div>

                        <div className="w-[9%] flex items-center">
                          {production.mission.type}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {production.mission.audit}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {production.mission.regional.name}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {production.highway.name}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {formatKM(production.km_start)}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {formatKM(production.km_end)}
                        </div>

                        <div
                          className="w-[4%] flex items-center 2xl:text-xl xl:text-base"
                          // onClick={() => {
                          //   if (view === production.id) setView(0);
                          //   else setView(production.id);
                          // }}
                        >
                          <InfoProductionModal
                            productions={productions}
                            currentProductionId={production.id}
                            returnEvent={() => listProductions()}
                          />
                          {/* <EditModalProduction edit_production={production} /> */}
                          {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full 2xl:h-20 xl:h-16 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 2xl:text-xl xl:text-lg 2xl:font-semibold xl:font-medium">
                    <p>Nenhuma produção cadastrada.</p>
                  </div>
                )
              ) : productions.length === 0 ? (
                <div className="w-full 2xl:h-20 xl:h-16 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 2xl:text-xl xl:text-lg 2xl:font-semibold xl:font-medium">
                  <p>Carregando...</p>
                </div>
              ) : null}
            </div>
            <div className="w-full 2xl:h-40 xl:h-28 flex items-center text-gray-600 gap-4">
              <p className="font-medium">Páginas</p>
              <div className="2xl:w-20 2xl:h-8 xl:w-16 xl:h-6 border-2 border-gray-300 rounded-md justify-center items-center gap-2">
                <input
                  className="border-none xl:flex justify-center items-center focus:ring-0 focus:outline-none w-full h-full bg-transparent 2xl:px-2 xl:px-1 xl:text-xs"
                  type="text"
                />
              </div>
              <div className="flex items-center gap-6 font-semibold xl:text-sm text-gray-400">
                <i className="fa-solid fa-angles-left"></i>
                <i className="fa-solid fa-angle-left"></i>
                {Array.from({ length: totalPage }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-2 ${
                      index + 1 === page ? "text-blue-400 underline" : ""
                    }`}
                    onClick={() => {
                      setPage(index + 1);
                      setIsLoading(true);
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
                <i className="fa-solid fa-angle-right"></i>
                <i className="fa-solid fa-angles-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
