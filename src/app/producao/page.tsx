"use client";
import { useEffect, useState } from "react";
import { ProductionOut } from "@/type/productionType";
import AddModalProduction from "../components/addModalProduction";
import api, { verifyToken, getMe } from "../services/api";
import { useRouter } from "next/navigation";
import EditModalProduction from "../components/editModalProduction";
import FilterModalProduction from "../components/filterModalProduction";

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
    const checkToken = async () => {
      await verifyToken(router.push);
    };
    const get = async () => {
      console.log(await getMe());
    };
    checkToken();
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
      setTotalItems(response.data.total_items);
      setTotalPage(Math.ceil(response.data.total_items / 7));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-24 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold text-2xl">Produção</p>
          <div></div>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center gap-6">
          <div className="w-10/12 flex justify-end items-center px-10">
            <AddModalProduction />
          </div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  onClick={() => toggleAllProduction(productions)}
                  className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  )}
                </div>
                <p className="text-gray-500 text-xl font-medium">
                  {selectedProduction.length} Selected
                </p>
              </div>
              <div className="flex justify-between gap-2 items-center text-lg cursor-pointer">
                <i className="fa-regular fa-trash-can text-blue-400"></i>
                <p className="text-gray-400">Deletar</p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <FilterModalProduction />
              <div className="flex justify-between items-center gap-2 text-lg cursor-pointer">
                <i className="fa-solid fa-arrow-down-wide-short text-blue-400"></i>
                <p className="text-gray-400">Ordenar por</p>
              </div>
            </div>
          </div>
          <div className="w-10/12 h-4/5 max-h-4/5 bg-white rounded-lg flex flex-col justify-between px-10 shadow-gray-300 shadow-md">
            <div className="w-full h-full max-h-full flex flex-col justify-start items-center">
              <div className="w-full h-20 border-b-2 border-gray-100 flex justify-between items-center text-gray-700 font-bold text-lg">
                <div className="w-[5.5%] flex items-center"></div>
                <div className="w-[4%] flex items-center gap-2">
                  <p>ID</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Data</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Tipo</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Auditoria</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Regional</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Rodovia</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>KM Inicial</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>KM Final</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
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
                            ? "h-40"
                            : "h-12"
                          : "h-16"
                      } border-b-2 border-gray-100 flex flex-col gap-3 ${
                        production.verification_status === "Corrigido"
                          ? "bg-blue-200"
                          : production.verification_status === "Errado"
                          ? "bg-red-200"
                          : production.verification_status === "Certo"
                          ? "bg-green-200"
                          : ""
                      } justify-center items-center text-gray-400 text-lg transition-all`}
                      key={production.id}
                    >
                      <div className="flex w-full justify-between">
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
                            const date = new Date(production.date);
                            return !isNaN(date.getTime())
                              ? date.toLocaleDateString()
                              : "Data inválida";
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
                          {production.km_start}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {production.km_end}
                        </div>

                        <div
                          className="w-[4%] flex items-center text-xl"
                          // onClick={() => {
                          //   if (view === production.id) setView(0);
                          //   else setView(production.id);
                          // }}
                        >
                          <EditModalProduction edit_production={production} />
                          {/* <i className="fa-solid fa-ellipsis-vertical"></i> */}
                          <i
                            className={
                              view === production.id
                                ? "fa-solid fa-chevron-up"
                                : "fa-solid fa-chevron-down"
                            }
                            onClick={() => {
                              setView(
                                view === production.id ? null : production.id
                              );
                            }}
                          ></i>
                        </div>
                      </div>
                      {view === production.id && (
                        <div className="flex w-full justify-between">
                          <div className="w-[5.5%] flex items-center justify-center"></div>
                          <div className="w-[4%] flex items-center"></div>
                          <div className="w-[10%] flex items-center">
                            {production.mission.activity}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.extension}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.state_highway}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.total_elements}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.mission.team.employee_one.name} /{" "}
                            {production.mission.team.employee_two.name}{" "}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.observation}
                          </div>
                          <div className="w-[9%] flex items-center">
                            {production.verification_observation
                              ? production.verification_observation
                              : "Sem nenhuma observação"}
                          </div>
                          <div className="w-[4%] flex items-center text-xl cursor-pointer"></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="w-full h-20 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 text-xl font-semibold">
                    <p>nenhuma produção cadastrada.</p>
                  </div>
                )
              ) : productions.length === 0 ? (
                <div className="w-full h-20 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 text-xl font-semibold">
                  <p>Carregando...</p>
                </div>
              ) : null}
            </div>
            <div className="w-full h-40 flex items-center text-gray-600 gap-4">
              <p className="font-medium">Páginas</p>
              <div className="w-20 h-8 border-2 border-gray-300 rounded-md justify-center items-center gap-2">
                <input
                  className="border-none focus:ring-0 focus:outline-none w-full h-full bg-transparent px-2"
                  type="text"
                />
              </div>
              <div className="flex items-center gap-6 font-semibold text-gray-400">
                <i className="fa-solid fa-angles-left"></i>
                <i className="fa-solid fa-angle-left"></i>
                {Array.from({ length: totalPage }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-2 ${
                      index + 1 === page ? "text-blue-400 underline" : ""
                    }`}
                    onClick={() => setPage(index + 1)}
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
