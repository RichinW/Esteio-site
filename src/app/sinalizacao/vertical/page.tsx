"use client";
import { useEffect, useState } from "react";
import { VerticalOut } from "@/type/sinalization/verticalType";
import api, { verifyToken, getMe } from "../../services/api";
import { useRouter } from "next/navigation";
export default function SVertical() {
  const [verticals, setVertical] = useState<VerticalOut[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [view, setView] = useState(0);
  const [selectedVertical, setSelectedVertical] = useState<VerticalOut[]>([]);
  const [page, setPage] = useState(1);
  const pageStart = 7 * (page - 1);
  const pageEnd = 7 * page;
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const get = async () => {
      console.log(await getMe());
    };
    get();
    listVertical();
  }, [router]);

  async function listVertical() {
    try {
      const response = await api.get("/production/listasv");
      setVertical(response.data.productions);
      setTotalPage(Math.ceil(response.data.total_items / 7));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const toggleVertical = (newVertical: VerticalOut) => {
    setSelectedVertical((prevState) => {
      const isSelected = prevState.find(
        (vertical) => vertical.id === newVertical.id
      );

      if (isSelected) {
        return prevState.filter((vertical) => vertical.id !== newVertical.id);
      } else {
        return [...prevState, newVertical];
      }
    });
  };

  const toggleAllVertical = (allVertical: VerticalOut[]) => {
    setSelectedVertical((prevState) => {
      if (prevState.length === allVertical.length) {
        return [];
      } else {
        return allVertical;
      }
    });
  };

  const isAllSelected = () => {
    return selectedVertical.length === verticals.length;
  };

  const isProductionSelected = (id: number) => {
    return selectedVertical.some((vertical) => vertical.id === id);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-full flex flex-col">
        <div className="w-full 2xl:h-24 xl:h-16 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold 2xl:text-2xl xl:xl">
            Sinalização Vertical
          </p>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center 2xl:gap-6 xl:gap-3">
          <div className="w-10/12 flex justify-end items-center px-10"></div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  className={`2xl:w-5 xl:w-4 xl:h-4 2xl:h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                  onClick={() => toggleAllVertical(verticals)}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white 2xl:text-sm xl:text-xs"></i>
                  )}
                </div>
                <p className="text-gray-500 2xl:text-xl xl:text-lg font-medium">
                  {selectedVertical.length} Selected
                </p>
              </div>

              <div className="flex justify-between gap-2 items-center 2xl:text-lg xl:text-base cursor-pointer">
                <i className="fa-regular fa-trash-can text-blue-400"></i>
                <p className="text-gray-400">Deletar</p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex justify-between items-center gap-2 2xl:text-lg xl:text-base cursor-pointer">
                <i className="fa-solid fa-filter text-blue-400"></i>
                <p className="text-gray-400">Filtrar</p>
              </div>
              <div className="flex justify-between items-center gap-2 2xl:text-lg xl:text-base cursor-pointer">
                <i className="fa-solid fa-arrow-down-wide-short text-blue-400"></i>
                <p className="text-gray-400">Ordenar por</p>
              </div>
            </div>
          </div>
          <div className="w-10/12 h-4/5 bg-white rounded-lg flex flex-col justify-between px-10 shadow-gray-300 shadow-md">
            <div className="w-full h-full flex flex-col justify-start items-center">
              <div className="w-full 2xl:h-20 xl:h-16 border-b-2 2xl:text-base xl:text-sm border-gray-100 flex justify-between items-center text-gray-700 font-bold text-lg">
                <div className="w-[5.5%] flex items-center"></div>
                <div className="w-[4%] flex items-center gap-2">
                  <p>ID</p>
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
                <div className="w-[6%] flex items-center gap-2">
                  <p>Km</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[14%] flex items-center gap-2">
                  <p>Tipo de Placa</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[15%] flex items-center gap-2">
                  <p>Material da Chapa</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[14%] flex items-center gap-2">
                  <p>Código da Placa</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[4%] flex items-center"></div>
              </div>
              {!loading ? (
                verticals.length > 0 ? (
                  verticals.map((vertical) => (
                    <div
                      className={`w-full ${
                        view == vertical.id ? "h-40" : "h-20"
                      } border-b-2 border-gray-100 flex flex-col gap-3 justify-center items-center text-gray-400 text-lg transition-all`}
                    >
                      <div className="flex w-full justify-between xl:text-sm 2xl:text-base">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div
                            className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                              isProductionSelected(vertical.id)
                                ? "bg-blue-400 border-blue-400"
                                : "border-gray-200"
                            }`}
                            onClick={() => toggleVertical(vertical)}
                          >
                            {isProductionSelected(vertical.id) && (
                              <i className="fa-solid fa-check text-white text-sm"></i>
                            )}
                          </div>{" "}
                        </div>
                        <div className="w-[4%] flex items-center">
                          {vertical.id}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.highway.name}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.km}
                        </div>
                        <div className="w-[6%] flex items-center">
                          {vertical.board_type}
                        </div>
                        <div className="w-[14%] flex items-center">
                          {vertical.type_of_support}
                        </div>
                        <div className="w-[15%] flex items-center">
                          {vertical.sheet_material}
                        </div>
                        <div className="w-[14%] flex items-center">
                          {vertical.plate_code}
                        </div>
                        <div className="w-[4%] flex items-center text-xl">
                          <i
                            className={
                              view
                                ? "fa-solid fa-chevron-up"
                                : "fa-solid fa-chevron-down"
                            }
                            onClick={() => {
                              //if (view === production.id) setView(0);
                              //else setView(production.id);
                            }}
                          ></i>
                        </div>
                      </div>
                      {view !== 0 && (
                        <div className="flex w-full justify-between">
                          <div className="w-[5.5%] flex items-center justify-center"></div>
                          <div className="w-[4%] flex items-center"></div>
                          <div className="w-[10%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[4%] flex items-center text-xl cursor-pointer"></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="w-full 2xl:h-20 xl:h-16 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 2xl:text-xl xl:text-lg 2xl:font-semibold xl:font-medium">
                    <p>Nenhuma sinalização vertical cadastrada.</p>
                  </div>
                )
              ) : verticals.length === 0 ? (
                <div className="w-full 2xl:h-20 xl:h-16 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 2xl:text-xl xl:text-lg 2xl:font-semibold xl:font-medium">
                  <p>Carregando...</p>
                </div>
              ) : null}
            </div>
            <div className="w-full 2xl:h-40 xl:h-28 flex items-center text-gray-600 gap-4">
              <p className="font-medium">Páginas</p>
              <div className="2xl:w-20 2xl:h-8 xl:w-16 xl:h-6 border-2 border-gray-300 rounded-md justify-center items-center gap-2">
                <input
                  className="border-none focus:ring-0 focus:outline-none w-full h-full bg-transparent px-2"
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
