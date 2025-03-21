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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-24 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold text-2xl">
            Sinalização Vertical
          </p>
          <div></div>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center gap-6">
          <div className="w-10/12 flex justify-end items-center px-10"></div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-500 rounded-sm cursor-pointer"></div>
                <p className="text-gray-500 text-xl font-medium">2 Selected</p>
              </div>
              <p className="text-gray-400 text-lg cursor-pointer">
                Selected all
              </p>
              <div className="flex justify-between gap-2 items-center text-lg cursor-pointer">
                <i className="fa-regular fa-trash-can text-blue-400"></i>
                <p className="text-gray-400">Deletar</p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex justify-between items-center gap-2 text-lg cursor-pointer">
                <i className="fa-solid fa-filter text-blue-400"></i>
                <p className="text-gray-400">Filtrar</p>
              </div>
              <div className="flex justify-between items-center gap-2 text-lg cursor-pointer">
                <i className="fa-solid fa-arrow-down-wide-short text-blue-400"></i>
                <p className="text-gray-400">Ordenar por</p>
              </div>
            </div>
          </div>
          <div className="w-10/12 h-4/5 bg-white rounded-lg flex flex-col justify-between px-10 shadow-gray-300 shadow-md">
            <div className="w-full h-full flex flex-col justify-start items-center">
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
                  <p>Km</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[12%] flex items-center gap-2">
                  <p>Tipo de Placa</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[12%] flex items-center gap-2">
                  <p>Material da Chapa</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[12%] flex items-center gap-2">
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
                      <div className="flex w-full justify-between">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-gray-200 rounded-sm"></div>
                        </div>
                        <div className="w-[4%] flex items-center">
                          {vertical.id}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {vertical.regional.name}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.highway.name}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.km}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.board_type}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.type_of_support}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {vertical.sheet_material}
                        </div>
                        <div className="w-[9%] flex items-center">
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
                  <div className="w-full h-20 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 text-xl font-semibold">
                    <p>nenhuma sinalização vertical cadastrada.</p>
                  </div>
                )
              ) : verticals.length === 0 ? (
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
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>...</p>
                <p>10</p>
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
