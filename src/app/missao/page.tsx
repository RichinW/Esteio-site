"use client";
import { useEffect, useState } from "react";
import AddModalMission from "../components/addModalMission";
import { MissionOut } from "@/type/missionType";
import api, { verifyToken } from "../services/api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import DeleteNotificationModal from "../components/deleteNotificationModal";
import InfoMissionModal from "../components/infoMissionModal";

export default function Missao() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<number | null>(null);
  const [missions, setMissions] = useState<MissionOut[]>([]);
  const router = useRouter();
  const [selectedMission, setSelectedMission] = useState<MissionOut[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const pageStart = 7 * (page - 1);
  const pageEnd = 7 * page;
  const [totalPage, setTotalPage] = useState<number>(1);
  const handleAddMission = () => {
    listMissions();
  };

  useEffect(() => {
    listMissions();
  }, [router]);

  useEffect(() => {
    listMissions();
  }, [page]);

  async function listMissions() {
    try {
      const response = await api.get(
        `/mission/listamissao/${pageStart}/${pageEnd}`
      );
      setMissions(response.data.missions);
      setTotalPage(Math.ceil(response.data.total_items / 7));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  const returnDelete = async () => {
    setSelectedMission([]);
    listMissions();
  };

  const toggleMission = (newMission: MissionOut) => {
    setSelectedMission((prevState) => {
      const isSelected = prevState.find(
        (mission) => mission.id === newMission.id
      );

      if (isSelected) {
        return prevState.filter((mission) => mission.id !== newMission.id);
      } else {
        return [...prevState, newMission];
      }
    });
  };

  const toggleAllMission = (allMissions: MissionOut[]) => {
    setSelectedMission((prevState) => {
      if (prevState.length === allMissions.length) {
        return [];
      } else {
        return allMissions;
      }
    });
  };

  const isAllSelected = () => {
    return selectedMission.length === missions.length;
  };

  const isEmployeeSelected = (id: number) => {
    return selectedMission.some((mission) => mission.id === id);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer />
      <div className="h-full w-full flex flex-col">
        <div className="w-full 2xl:h-24 xl:h-16 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold 2xl:text-2xl xl:xl">
            Rotas
          </p>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center 2xl:gap-6 xl:gap-3">
          <div className="w-10/12 flex justify-end items-center px-10">
            <AddModalMission onMissionAdded={handleAddMission} />
          </div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  className={`2xl:w-5 xl:w-4 xl:h-4 2xl:h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                  onClick={() => toggleAllMission(missions)}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white 2xl:text-sm xl:text-xs"></i>
                  )}
                </div>
                <p className="text-gray-500 2xl:text-xl xl:text-lg font-medium">
                  {selectedMission.length} Selected
                </p>
              </div>
              <div className="flex justify-between gap-2 items-center 2xl:text-lg xl:text-base cursor-pointer">
                <DeleteNotificationModal
                  list={selectedMission}
                  name="Rota"
                  apiRoute="deletemissao"
                  baseRoute="mission"
                  returnEvent={() => returnDelete()}
                  trigger={
                    <>
                      <i className="fa-regular fa-trash-can text-blue-400"></i>
                      <p className="text-gray-400">Deletar</p>
                    </>
                  }
                />
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
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[10%] flex items-center gap-2">
                  <p>Nome</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[10%] flex items-center gap-2">
                  <p>Atividade</p>
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
                <div className="w-[4%] flex items-center gap-2">
                  <p>Ativa</p>
                  <div className="flex flex-col justify-center text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[4%] flex items-center"></div>
              </div>
              {!isLoading ? (
                missions && missions.length > 0 ? (
                  missions.map((mission) => (
                    <div
                      className={`w-full ${
                        view !== null
                          ? mission.id === view
                            ? "2xl:h-40 xl:h-36"
                            : "2xl:h-12 xl:h-8"
                          : "2xl:h-16 xl:h-12"
                      } border-b-2 border-gray-100 flex flex-col gap-3 justify-center items-center text-gray-400 text-lg transition-all`}
                      key={mission.id}
                    >
                      <div className="flex w-full justify-between xl:text-sm 2xl:text-base">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div
                            onClick={() => toggleMission(mission)}
                            className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                              isEmployeeSelected(mission.id)
                                ? "bg-blue-400 border-blue-400"
                                : "border-gray-200"
                            }`}
                          >
                            {isEmployeeSelected(mission.id) && (
                              <i className="fa-solid fa-check text-white text-sm"></i>
                            )}
                          </div>{" "}
                        </div>
                        <div className="w-[4%] flex items-center">
                          {mission.id}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {mission.name}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {mission.activity}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {mission.type}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {mission.audit}
                        </div>
                        <div className="w-[9%] flex items-center">
                          {mission.regional
                            ? mission.regional.name
                            : "Sem regional"}
                        </div>
                        <div className="w-[4%] flex items-center">
                          {mission.active ? "Sim" : "Não"}
                        </div>

                        <div
                          className="w-[4%] flex items-center 2xl:text-xl xl:text-base"
                          // onClick={() => {
                          //   if (view === production.id) setView(0);
                          //   else setView(production.id);
                          // }}
                        >
                          <InfoMissionModal mission={mission} returnEvent={() => listMissions()} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full 2xl:h-20 xl:h-16 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 2xl:text-xl xl:text-lg 2xl:font-semibold xl:font-medium">
                    <p>Nenhuma missão cadastrado.</p>
                  </div>
                )
              ) : missions.length === 0 ? (
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
