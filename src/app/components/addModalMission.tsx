import { FC, useEffect, useState } from "react";
import InputText from "./inputText";
import { RegionalOut } from "@/type/regionalType";
import { TeamOut } from "@/type/teamType";
import { MissionIn } from "@/type/missionType";
import SelectDefault from "./Select";
import api from "../services/api";
import { toast } from "react-toastify";

interface Options {
  label: string;
  value: number;
}

interface AddModalMissionProps {
  onMissionAdded: () => void;
}

const AddModalMission: FC<AddModalMissionProps> = ({ onMissionAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [mission, setMission] = useState<MissionIn>({
    name: "",
    observation: "",
    type: "",
    activity: "",
    audit: null,
    id_regional: null,
    km_start: null,
    km_end: null,
    start_date: "",
    end_date: "",
    id_team: null,
  });
  const [regionais, setRegionais] = useState<RegionalOut[]>([]);
  const [teams, setTeams] = useState<TeamOut[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNameChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      name: value || "",
    }));
  };

  const handleActivityChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      activity: value || "",
    }));
  };

  const handleTypeChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      type: value || "",
    }));
  };

  const handleObservationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setMission((prevMission) => ({
      ...prevMission,
      observation: value,
    }));
  };

  const handleStartDateChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      start_date: value || "",
    }));
  };

  const handleEndDateChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      end_date: value || "",
    }));
  };

  const handleAuditChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      audit: value ? Number(value) : null,
    }));
  };

  const handleKmStartChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      km_start: value ? Number(value) : null,
    }));
  };

  const handleKmEndChange = (value?: string) => {
    setMission((prevMission) => ({
      ...prevMission,
      km_end: value ? Number(value) : null,
    }));
  };

  const handleRegionalChange = (value?: Options) => {
    setMission((prevEmployee) => ({
      ...prevEmployee,
      id_regional: value?.value || null,
    }));
  };

  const handleTeamChange = (value?: Options) => {
    setMission((prevEmployee) => ({
      ...prevEmployee,
      id_team: value?.value || null,
    }));
  };

  useEffect(() => {
    listRegionals();
    listTeams();
  }, []);

  const optionsRegional = regionais.map((regional) => ({
    value: regional.id,
    label: regional.name,
  }));

  const optionsTeam = teams.map((team) => ({
    value: team.id,
    label: `${team.employee_one.name} / ${team.employee_two.name}`,
  }));

  async function listRegionals() {
    try {
      const response = await api.get("/regional/listaregional");
      setRegionais(response.data.regionais);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function listTeams() {
    try {
      const response = await api.get("/team/listatime");
      setTeams(response.data.teams);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  async function addMission() {
    const body = {
      name: mission.name,
      observation: mission.observation,
      type: mission.type,
      activity: mission.activity,
      audit: mission.audit,
      id_regional: mission.id_regional,
      km_start: mission.km_start,
      km_end: mission.km_end,
      start_date: mission.start_date,
      end_date: mission.end_date,
      id_team: mission.id_team,
    };
    try {
      const response = await api.post("/mission/cadastromissao", body);
      onMissionAdded();
      setShowModal(false);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Erro ao cadastrar missão. Tente novamente!");
    }
  }

  function clearInputs() {
    setMission({
      name: "",
      observation: "",
      type: "",
      activity: "",
      audit: null,
      id_regional: null,
      km_start: null,
      km_end: null,
      start_date: "",
      end_date: "",
      id_team: null,
    });
  }

  return (
    <>
      <div
        className="w-56 h-12 flex justify-between items-center text-xl text-blue-400 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">Adicionar Missão</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center h-20 min-h-20 text-3xl text-gray-600  border-b-2 border-gray-100 ">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Time</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <i
                  className="fas fa-times"
                  onClick={() => {
                    setShowModal(false);
                    clearInputs();
                  }}
                ></i>
              </button>
            </div>
            <div className="flex w-full h-full flex-col items-center justify-start pt-4 overflow-y-scroll">
              <div className="flex flex-col items-center justify-start gap-10 w-full">
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="80"
                      placeholder="Nome"
                      type="text"
                      input={mission.name}
                      setInput={handleNameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Auditoria"
                      type="text"
                      input={
                        mission.audit !== null ? String(mission.audit) : ""
                      }
                      setInput={handleAuditChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="80"
                      placeholder="Atividade"
                      type="text"
                      input={mission.activity}
                      setInput={handleActivityChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Tipo"
                      type="text"
                      input={mission.type}
                      setInput={handleTypeChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                  <InputText
                      width="80"
                      placeholder="Km Início"
                      type="number"
                      input={
                        mission.km_start !== null ? String(mission.km_start) : ""
                      }
                      setInput={handleKmStartChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Km Final"
                      type="number"
                      input={
                        mission.km_end !== null ? String(mission.km_end) : ""
                      }
                      setInput={handleKmEndChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <InputText
                      width="80"
                      placeholder="Data de Início"
                      type="date"
                      input={mission.start_date}
                      setInput={handleStartDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      width="80"
                      placeholder="Data de Finalização"
                      type="date"
                      input={mission.end_date}
                      setInput={handleEndDateChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    options={optionsRegional}
                    value={mission.id_regional}
                    onChange={handleRegionalChange}
                    placeholder="Regional"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <SelectDefault
                    options={optionsTeam}
                    value={mission.id_team}
                    onChange={handleTeamChange}
                    placeholder="Time"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full px-8 h-full">
                  <textarea
                    className="focus:outline-none bg-gray-100 px-6 rounded-md resize-none py-4 text-gray-500 h-56"
                    onChange={handleObservationChange}
                    placeholder="Observação"
                    value={mission.observation}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="w-full h-24 min-h-24 flex justify-end items-center p-2 mt-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
                onClick={() => addMission()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalMission;
