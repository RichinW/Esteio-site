import { useState } from "react";
import InputText from "./inputText";
import { FilterIn } from "@/type/types";

const FilterModalProduction = () => {
  const [showModal, setShowModal] = useState(false);
  const [productionFilter, setProductionFillter] = useState<FilterIn>({
    date: "",
    audit: null,
    activity: "",
    type: "",
    regional: "",
    highway: ""
  });

  const handleDateChange = (value?: string) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      date: value || "",
    }));
  };

  const handleAuditChange = (value?: number) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      audit: value || null,
    }));
  };

  const handleActivityChange = (value?: string) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      activity: value || "",
    }));
  };

  const handleTypeChange = (value?: string) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      type: value || "",
    }));
  };

  const handleRegionalChange = (value?: string) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      regional: value || "",
    }));
  };

  const handleHighwayChange = (value?: string) => {
    setProductionFillter((prevProduction) => ({
      ...prevProduction,
      highway: value || "",
    }));
  };

  function formattedDateFunction(date: Date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log(formattedDate);
    return formattedDate;
  }

  return (
    <>
      <div
        className="flex justify-between items-center gap-2 text-lg cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-filter text-blue-400"></i>
        <p className="text-gray-400">Filtrar</p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center h-20 min-h-20 text-3xl text-gray-600  border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Filtrar Produção</p>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <i
                  className="fas fa-times"
                  onClick={() => setShowModal(false)}
                ></i>
              </button>
            </div>
            <div className="flex w-full h-full flex-col items-center justify-start pt-4">
              <div className="flex flex-col items-center justify-start gap-10 w-full">
                <div className="flex w-11/12 h-full justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="pl-2">Data</p>
                    <InputText
                      width="80"
                      placeholder="Data"
                      type="text"
                      input={productionFilter.date}
                      setInput={handleDateChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Auditoria</p>
                    <InputText
                      width="80"
                      placeholder="Auditoria"
                      type="text"
                      input={productionFilter.audit}
                      setInput={handleAuditChange}
                    />
                  </div>{" "}
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Atividade</p>
                    <InputText
                      width="80"
                      placeholder="Atividade"
                      type="text"
                      input={productionFilter.activity}
                      setInput={handleActivityChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <p className="pl-2">Tipo</p>
                      <InputText
                        width="80"
                        placeholder="Tipo"
                        type="text"
                        input={productionFilter.type}
                        setInput={handleTypeChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Regional</p>
                    <InputText
                      width="80"
                      placeholder="Regional"
                      type="text"
                      input={productionFilter.regional}
                      setInput={handleRegionalChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="pl-2">Rodovia</p>
                    <InputText
                      width="80"
                      placeholder="Rodovia"
                      type="text"
                      input={productionFilter.highway}
                      setInput={handleHighwayChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-24 min-h-24 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 text-xl font-light flex justify-center items-center text-white rounded-lg w-32 h-12 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Filtrar"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModalProduction;
