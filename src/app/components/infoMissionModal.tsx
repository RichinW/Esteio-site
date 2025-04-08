import { FC, useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { MissionOut } from "@/type/missionType";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MapClientOnly from "./MapModal";
import DeleteNotificationModal from "./deleteNotificationModal";

interface ObjMission {
  mission: MissionOut;
  returnEvent: () => {};
}

const InfoMissionModal: FC<ObjMission> = ({ mission ,returnEvent }) => {
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState<number[]>([]);
  const listMission = [mission]

  const getFirstTwoNames = (fullName: string) => {
    const names = fullName.split(" ");
    return names.length > 1 ? names.slice(0, 2).join(" ") : names[0];
  };

  const formatCPF = (cpf: string) => {
    if (!cpf) return "";
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return cpf;

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return format(date, "dd, MMM - yyyy", { locale: enUS });
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
              <div
                className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => setShowModal(false)}
              >
                <i className="fa-solid fa-arrow-left text-lg"></i>
              </div>
              <div className="flex gap-2">
                <div className="p-2 flex justify-center items-center rounded-md border-2 border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                  <i className="fa-solid fa-pencil text-lg"></i>
                </div>
                <DeleteNotificationModal
                  name="Produção"
                  list={listMission}
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
            <div className="overflow-y-auto w-full">
              <div className="w-full flex justify-start px-6 2xl:py-8 xl:py-4 flex-col gap-3 bg-white border-b-2 border-t-2">
                <div className="flex justify-start gap-2 items-center">
                  <p className="xl:text-base xl:font-semibold text-gray-700">
                    Equipe
                  </p>
                  <div
                    className={`xl:px-2 xl:py-1 rounded-md ${
                      mission.active ? "bg-green-400" : "bg-red-500"
                    } text-white flex justify-center items-center`}
                  >
                    <p className="xl:text-xs">
                      {mission.active ? "Ativo" : "Desativado"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <div className="flex justify-start items-center gap-2">
                    <i className="fa-solid fa-circle-user xl:text-2xl"></i>
                    <p className="xl:text-sm">
                      {mission.team.employee_one.name}
                    </p>
                  </div>
                  {mission.team.employee_two && (
                    <div className="flex justify-start items-center gap-2">
                      <i className="fa-solid fa-circle-user xl:text-2xl"></i>
                      <p className="xl:text-sm">
                        {mission.team.employee_two.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-80 flex justify-center items-center py-4 px-6 bg-white border-b-2">
                <div className="w-full h-full justify-center items-center rounded-lg z-0">
                  <MapClientOnly position={[-30.0331, -51.23]} />
                </div>
              </div>
              <div className="w-full flex justify-center py-3 bg-white">
                <div className="w-11/12 h-auto border-2 rounded-md flex flex-col items-center pb-4">
                  <div className="w-full h-12 border-b-2 px-6 flex items-end pb-3 font-semibold text-sm text-gray-700 mb-5">
                    Informações da Programação
                  </div>
                  <div className="w-full h-auto bg-white py-3">
                    <div className="w-full flex justify-between items-start">
                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center h-10">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Data de Início
                              </p>
                              <p className="text-xs text-gray-700">
                                {(() => {
                                  const [y, m, d] = mission.start_date;
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
                              <p className="text-xs text-gray-400">
                                Levantamento
                              </p>
                              <p className="text-xs text-gray-700">
                                {mission.activity}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center h-10">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Auditoria</p>
                              <p className="text-xs text-gray-700">
                                {mission.audit}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6 w-52">
                        <div className="flex px-6 w-full justify-between items-center h-10">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">
                                Data Final
                              </p>
                              <p className="text-xs text-gray-700">
                                {(() => {
                                  const [y, m, d] = mission.end_date;
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
                              <p className="text-xs text-gray-400">
                                Tipo de Levantamento
                              </p>
                              <p className="text-xs text-gray-700">
                                {mission.type}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex px-6 w-full justify-between items-center h-10">
                          <div className="flex flex-col gap-4 justify-start items-start">
                            <div className="flex flex-col font-semibold">
                              <p className="text-xs text-gray-400">Regional</p>
                              <p className="text-xs text-gray-700">
                                {mission.regional.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default InfoMissionModal;
