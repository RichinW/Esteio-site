import { FC, useEffect, useState } from "react";
import InputText from "./inputText";
import { RegionalOut } from "@/type/regionalType";
import { TeamOut } from "@/type/equipeType";
import { MissionIn } from "@/type/rotaType";
import SelectDefault from "./Select";
import api from "../services/api";
import { toast } from "react-toastify";
import { HighwayOut } from "@/type/rodoviaType";
import Select, { MultiValue } from "react-select";
import MapClientOnly from "./MapModal";

type Option = {
  label: string;
  value: number;
};

interface Options {
  label: string;
  value: number;
}

interface AddModalMissionProps {
  onMissionAdded: () => void;
}

const AddModalMission: FC<AddModalMissionProps> = ({ onMissionAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [allHighways, setAllHighways] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mission, setMission] = useState<MissionIn>({
    name: "",
    observation: "",
    type: "",
    activity: "",
    audit: null,
    id_regional: null,
    start_date: "",
    end_date: "",
    id_team: null,
  });
  const [regionais, setRegionais] = useState<RegionalOut[]>([]);
  const [teams, setTeams] = useState<TeamOut[]>([]);
  const [highways, setHighways] = useState<Options[]>([]);
  const [selectedHighways, setSelectedHighways] = useState<number[]>([]);
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
    label: `${team.employee_one.name} ${
      team.employee_two ? `/ ${team.employee_two.name}` : ""
    }`,
  }));

  useEffect(() => {
    const selectedRegional = regionais.find(
      (r) => r.id === mission.id_regional
    );
    const listHighways =
      selectedRegional?.highways?.map((r) => ({
        value: r.id,
        label: r.name,
      })) ?? [];

    setHighways(listHighways);
  }, [mission.id_regional, regionais]);

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

  const customDefaut = {
    control: (base: any) => ({
      ...base,
      minHeight: "48px", // altura mínima
      maxHeight: "auto", // deixa crescer
      flexWrap: "wrap", // permite quebrar para múltiplas linhas
      overflowY: "auto",
      backgroundColor: "#f3f4f6", // Altera o fundo do select
      borderColor: "transparent", // Altera a cor da borda
      borderRadius: 8, // <-- Adiciona borda arredondada
      "&:hover": {
        borderColor: "transparent", // Altera a cor da borda ao passar o mouse
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#ffffff", // Altera o fundo do menu de opções
      borderRadius: 8, // Opcional: também arredonda o menu dropdown
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#4CAF50"
        : state.isFocused
        ? "#e2e8f0"
        : "#ffffff", // Cor de fundo da opção (ao passar o mouse ou selecionada)
      color: state.isSelected ? "#fff" : "#000", // Cor do texto da opção (branca quando selecionada)
    }),
  };

  async function addMission() {
    const body = {
      name: mission.name,
      observation: mission.observation,
      type: mission.type,
      activity: mission.activity,
      audit: mission.audit,
      id_regional: mission.id_regional,
      start_date: mission.start_date,
      end_date: mission.end_date,
      id_team: mission.id_team,
    };
    try {
      setLoading(true);
      const response = await api.post("/mission/cadastromissao", body);
      onMissionAdded();
      clearInputs();
      setShowModal(false);
      toast.success(response.data.message);
      setLoading(false);
    } catch (err) {
      toast.error("Erro ao cadastrar missão. Tente novamente!");
      setLoading(false);
    }
  }

  const selectedOptions = highways.filter((h) =>
    selectedHighways.includes(h.value)
  );

  function clearInputs() {
    setMission({
      name: "",
      observation: "",
      type: "",
      activity: "",
      audit: null,
      id_regional: null,
      start_date: "",
      end_date: "",
      id_team: null,
    });
  }

  return (
    <>
      <div
        className="2xl:w-60 2xl:h-12 flex justify-between items-center 2xl:text-xl text-blue-400 2xl:py-2 2xl:px-4 xl:gap-2 xl:px-2 xl:py-1 2xl:rounded-md xl:rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => {
          setShowModal(true)
          setShowMap(false)
        }}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">Adicionar Missão</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all gap-2">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6 transition-all">
            <div className="w-full flex justify-between items-center 2xl:h-20 2xl:min-h-20 text-3xl xl:text-2xl xl:h-16 xl:min-h-20 text-gray-600 border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Missão</p>
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
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Nome"
                      type="text"
                      input={mission.name}
                      setInput={handleNameChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      fontSize="2xl:text-lg xl:text-base"
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
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Atividade"
                      type="text"
                      input={mission.activity}
                      setInput={handleActivityChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      fontSize="2xl:text-lg xl:text-base"
                      placeholder="Tipo"
                      type="text"
                      input={mission.type}
                      setInput={handleTypeChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-80">
                    <input
                      type="text"
                      value={mission.start_date}
                      placeholder="Data da ida"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "") //
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{4}).*/, "$1");

                        setMission((prev) => ({
                          ...prev,
                          start_date: formatted,
                        }));
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={mission.end_date}
                      placeholder="Data da volta"
                      className="px-3 py-2 rounded placeholder:text-gray-400 text-gray-700 w-full outline-none 2xl:h-16 xl:h-12 bg-gray-100 2xl:w-80 xl:w-52"
                      onChange={(e) => {
                        const value = e.target.value;

                        const formatted = value
                          .replace(/\D/g, "") //
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{2})(\d)/, "$1/$2")
                          .replace(/(\d{4}).*/, "$1");

                        setMission((prev) => ({
                          ...prev,
                          end_date: formatted,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full xl:px-5 h-full">
                  <SelectDefault
                    height="46"
                    options={optionsTeam}
                    value={mission.id_team}
                    onChange={handleTeamChange}
                    placeholder="Equipe"
                    width="full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full xl:px-5 h-full">
                  <SelectDefault
                    height="46"
                    options={optionsRegional}
                    value={mission.id_regional}
                    onChange={handleRegionalChange}
                    placeholder="Regional"
                    width="full"
                  />
                  <div className="flex justify-start items-center gap-2 pl-1">
                    <div
                      onClick={() => setShowMap(!showMap)}
                      className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                        showMap
                          ? "bg-blue-400 border-blue-400"
                          : "border-gray-500"
                      }`}
                    >
                      {showMap && (
                        <i className="fa-solid fa-check text-white text-sm"></i>
                      )}
                    </div>
                    <p className="text-gray-500">Abrir Mapa</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full xl:px-5 h-auto">
                  <div className={`w-full bg-gray-100`}>
                    <Select<Option, true>
                      options={highways}
                      isMulti
                      value={selectedOptions}
                      onChange={(selected) => {
                        const selectedValues =
                          selected?.map((s) => s.value as number) ?? [];
                        setSelectedHighways(selectedValues);
                      }}
                      styles={customDefaut}
                      placeholder="Rodovias"
                      getOptionLabel={(e) => e.label}
                      getOptionValue={(e) => String(e.value)}
                      isDisabled={allHighways}
                    />
                  </div>
                  <div className="flex justify-start items-center gap-2 pl-1">
                    <div
                      onClick={() => setAllHighways(!allHighways)}
                      className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                        allHighways
                          ? "bg-blue-400 border-blue-400"
                          : "border-gray-500"
                      }`}
                    >
                      {allHighways && (
                        <i className="fa-solid fa-check text-white text-sm"></i>
                      )}
                    </div>
                    <p className="text-gray-500">Todas as Rodovias</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full xl:px-5 h-full">
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
                className="border-none bg-blue-500 2xl:text-xl xl:text-base font-light flex justify-center items-center text-white rounded-lg 2xl:w-32 2xl:h-12 xl:w-24 xl:h-10 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
                disabled={loading}
                onClick={() => addMission()}
              />
            </div>
          </div>
          {showMap && (
            <div className="w-4/12 h-5/6 flex justify-center items-center p-4 bg-white rounded-lg transition-all">
              <MapClientOnly position={[0, 0]} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AddModalMission;
