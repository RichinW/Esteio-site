"use client";
import { useEffect, useState } from "react";
import { TeamOut } from "@/type/teamType";
import { PermissionOut } from "@/type/permissionType";
import AddModalTeam from "../components/addModalTeam";
import { useRouter } from "next/navigation";
import api, { verifyToken, getMe } from "@/app/services/api";

export default function Time() {
  const [teams, setTeams] = useState<TeamOut[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [view, setView] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<TeamOut[]>([]);
  const [permissions, setPermissions] = useState<PermissionOut[]>();
  const [page, setPage] = useState(1);
  const pageStart = 7 * (page - 1);
  const pageEnd = 7 * page;
  const [totalPage, setTotalPage] = useState<number>(1);
  const handleAddTeam = () => {
    listTeams();
  };

  useEffect(() => {
    const checkToken = async () => {
      await verifyToken(router.push);
    };
    const get = async () => {
      const repsonse = await getMe();
      setPermissions(repsonse?.data.employee.account.permissions);
    };
    checkToken();
    get();
    listTeams();
  }, [router]);

  useEffect(() => {
    listTeams();
  }, [page]);

  async function listTeams() {
    try {
      const response = await api.get(`/team/listatime/${pageStart}/${pageEnd}`);
      setTeams(response.data.teams);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const toggleTeam = (newTeam: TeamOut) => {
    setSelectedTeam((prevState) => {
      const isSelected = prevState.find(
        (team) => team.id === newTeam.id
      );

      if (isSelected) {
        return prevState.filter((team) => team.id !== newTeam.id);
      } else {
        return [...prevState, newTeam];
      }
    });
  };

  const toggleAllTeam = (allTeams: TeamOut[]) => {
    setSelectedTeam((prevState) => {
      if (prevState.length === allTeams.length) {
        return [];
      } else {
        return allTeams;
      }
    });
  };

  const isAllSelected = () => {
    return selectedTeam.length === teams.length;
  };

  const isProductionSelected = (id: number) => {
    return selectedTeam.some((team) => team.id === id);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-24 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold text-2xl">Times</p>
          <div></div>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center gap-6">
          <div className="w-10/12 flex justify-end items-center px-10">
            {permissions &&
              permissions.some((permission) => permission.name === "adm") && (
                <AddModalTeam onTeamAdded={handleAddTeam} />
              )}
          </div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                  onClick={() => toggleAllTeam(teams)}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  )}
                </div>
                <p className="text-gray-500 text-xl font-medium">
                  {selectedTeam.length} Selected
                </p>
              </div>
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
                <div className="w-[15%] flex items-center gap-2">
                  <p>Nome Funcionario</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[15%] flex items-center gap-2">
                  <p>Nome Funcionario</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[15%] flex items-center gap-2">
                  <p>Data de Registro</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    /* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[4%] flex items-center"></div>
              </div>
              {!loading ? (
                teams.length > 0 ? (
                  teams.map((team) => (
                    <div
                      className={`w-full ${
                        view !== null
                          ? team.id === view
                            ? "h-40"
                            : "h-12"
                          : "h-16"
                      } border-b-2 border-gray-100 flex flex-col gap-3 justify-center items-center text-gray-400 text-lg transition-all`}
                    >
                      <div className="flex w-full justify-between">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div
                            className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                              isProductionSelected(team.id)
                                ? "bg-blue-400 border-blue-400"
                                : "border-gray-200"
                            }`}
                            onClick={() => toggleTeam(team)}
                          >
                            {isProductionSelected(team.id) && (
                              <i className="fa-solid fa-check text-white text-sm"></i>
                            )}
                          </div>
                        </div>
                        <div className="w-[4%] flex items-center">
                          {team.id}
                        </div>
                        <div className="w-[15%] flex items-center">
                          {team.employee_one.name}
                        </div>
                        <div className="w-[15%] flex items-center">
                          {team.employee_two?.name}
                        </div>
                        <div className="w-[15%] flex items-center">
                        {(() => {
                            const date = new Date(team.date_register);
                            return !isNaN(date.getTime())
                              ? date.toLocaleDateString()
                              : "Data inválida";
                          })()}
                        </div>
                        <div className="w-[9%] flex items-center"></div>
                        <div className="w-[9%] flex items-center"></div>
                        <div className="w-[9%] flex items-center"></div>

                        <div className="w-[4%] flex items-center text-xl">
                          <i
                            className={
                              view === team.id
                                ? "fa-solid fa-chevron-up"
                                : "fa-solid fa-chevron-down"
                            }
                            onClick={() => {
                              setView(view === team.id ? null : team.id);
                            }}
                          ></i>
                        </div>
                      </div>
                      {view === team.id && (
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
                    <p>Nenhum time cadastrado.</p>
                  </div>
                )
              ) : teams.length === 0 ? (
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
