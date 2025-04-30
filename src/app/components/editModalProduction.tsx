import { FC, useState } from "react";
import InputText from "./inputText";
import { ProductionOut, EditModalProductionProps } from "@/type/producaoType";
import { data } from "react-router-dom";

const EditModalProduction: FC<EditModalProductionProps> = ({
  edit_production,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [production, setProduction] = useState<ProductionOut>(edit_production);

  const handleDateChange = (value: string) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      date: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      type: value,
    }));
  };

  const handleActivityChange = (value: string) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      activity: value,
    }));
  };

  const handleAuditChange = (value: number) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      audit: value,
    }));
  };

  const handleKmStartChange = (value: number) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      km_start: value,
    }));
  };

  const handleKmEndChange = (value: number) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      km_end: value,
    }));
  };

  const handleExtensionChange = (value: number) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      extension: value,
    }));
  };

  const handleTotalElementsChange = (value: number) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      total_elements: value,
    }));
  };

  const handleStateHighwayChange = (value: string) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      state_highway: value,
    }));
  };

  const handleObservationChange = (value?: string) => {
    setProduction((prevProduction) => ({
      ...prevProduction,
      observation: value,
    }));
  };

  // const handleVerificationStatusChange = (value?: Status) => {
  //   setProduction((prevProduction) => ({
  //     ...prevProduction,
  //     verification_status: value,
  //   }));
  // };

  // const handleVerificationObservationChange = (value?: string) => {
  //   setProduction((prevProduction) => ({
  //     ...prevProduction,
  //     verification_observation: value,
  //   }));
  // };

  return (
    <>
      <div
        className="w-52 h-12 flex justify-between items-center cursor-pointer cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center h-20 min-h-20 text-3xl text-gray-600  border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Editar Produção</p>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setProduction(edit_production);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex w-full h-4/6 flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-10 overflow-y-scroll w-full">
                {/* <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Data</p>
                    <InputText
                      width="80"
                      placeholder="Tipo"
                      type="date"
                      input={`${production.date}`}
                      setInput={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Atividade</p>
                    <InputText
                      width="80"
                      placeholder="Atividade"
                      type="text"
                      input={production.m}
                      setInput={handleActivityChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Tipo</p>
                    <InputText
                      width="80"
                      placeholder="Tipo"
                      type="text"
                      input={production.type}
                      setInput={handleTypeChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Auditoria</p>
                    <InputText
                      width="80"
                      placeholder="Auditoria"
                      type="text"
                      input={`${production.audit}`}
                      setInput={handleAuditChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Regional</p>
                    <InputText
                      width="80"
                      placeholder="Regional"
                      type="text"
                      input={production.team.id_mission.regional}
                      setInput={handleRegionalChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Rodovia</p>
                    <InputText
                      width="80"
                      placeholder="Rodovia"
                      type="text"
                      input={production.highway}
                      setInput={handleHighwayChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Km Inicial</p>
                    <InputText
                      width="80"
                      placeholder="Km Inicial"
                      type="text"
                      input={production.km_start}
                      setInput={handleKmStartChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Km Final</p>
                    <InputText
                      width="80"
                      placeholder="Km Final"
                      type="text"
                      input={production.km_end}
                      setInput={handleKmEndChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Extensão</p>
                    <InputText
                      width="80"
                      placeholder="Extensão"
                      type="text"
                      input={production.extension}
                      setInput={handleExtensionChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Estado da Rodovia</p>
                    <InputText
                      width="80"
                      placeholder="Km Final"
                      type="text"
                      input={production.state_highway}
                      setInput={handleStateHighwayChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Extensão</p>
                    <InputText
                      width="80"
                      placeholder="Extensão"
                      type="text"
                      input={production.extension}
                      setInput={handleExtensionChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Estado da Rodovia</p>
                    <InputText
                      width="80"
                      placeholder="Km Final"
                      type="text"
                      input={production.state_highway}
                      setInput={handleStateHighwayChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="pl-2">Extensão</p>
                    <InputText
                      width="full"
                      placeholder="Extensão"
                      type="text"
                      input={production.extension}
                      setInput={handleExtensionChange}
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <p className="pl-2">Observacação de Verificação</p>
                    <textarea
                      className="w-full focus:outline-none bg-gray-100 resize-none p-4 text-gray-600 text-lg h-96"
                      name=""
                      id=""
                      value={production.verification_observation}
                      onChange={(e)=> setProduction((prevProduction) => ({
                        ...prevProduction,
                        verification_observation: e.target.value
                      }))}
                    ></textarea>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="w-full h-24 min-h-24 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModalProduction;
