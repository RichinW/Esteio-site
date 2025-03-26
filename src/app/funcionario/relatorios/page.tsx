// "use client"
// import DateRange from "@/app/components/dateRange";
// import SelectDefault from "@/app/components/Select";
// import api from "@/app/services/api";
// import { EmployeeIn, EmployeeOut } from "@/type/employeeType";
// import { useEffect, useState } from "react";

// interface Options {
//   label: string;
//   value: number;
// }

// export default function RelatorioFuncionario() {
//   const [employeeID, setEmployeeID] = useState<number>();
//   const [employees, setEmployees] = useState<EmployeeOut[]>([]);

//   async function listEmployees() {
//     try {
//       const resposne = await api.get("/employee/listafuncionario");
//       setEmployees(resposne.data.employees);
//     } catch (err) {}
//   }

//   const handleEmployeeChange = (value?: Options) => {
//     setEmployeeID(value?.value);
//   };

//   useEffect(() => {
//     listEmployees();
//   }, []);

//   const options = employees.map((employee) => ({
//     value: employee.id,
//     label: employee.name,
//   }));

//   return (
//     <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 gap-6 overflow-y-scroll py-10">
//       <div className="w-10/12 px-4 text-gray-700 text-2xl font-bold">
//         Relatórios
//       </div>
//       <div className="w-full h-full flex flex-col justify-center items-center gap-8 ">
//         <div className="w-10/12 h-3/6 bg-white justify-start items-center rounded-lg flex flex-col px-8 py-4 shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
//           <div className="w-full flex items-center gap-6">
//             <SelectDefault
//               options={options}
//               value={employeeID}
//               onChange={handleEmployeeChange}
//               placeholder="Funcionário"
//               width=""
//             />
//             {/* <div className="flex justify-center items-center gap-4 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] px-4 py-2 rounded-md">
//               <p className="text-gray-700 text-2xl">Richard Walace</p>
//               <i className="fa-solid fa-angle-down text-gray-700 text-xl"></i>
//             </div> */}
//             <DateRange />
//           </div>
//           <div className="w-full h-full flex justify-between items-center">
//             <div className="flex flex-col w-1/2 gap-6">
//               <div className="w-full flex gap-6">
//                 <div className="w-56 h-24 rounded-lg bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex gap-2 flex-col p-3">
//                   <p className="text-gray-400 font-medium text-xl">SV</p>
//                   <div className="w-full flex justify-between items-end">
//                     <p className="text-gray-700 font-semibold text-3xl">1000</p>
//                     <i className="fa-solid fa-circle-info hover:text-gray-400 transition-all"></i>
//                   </div>
//                 </div>
//                 <div className="w-56 h-24 rounded-lg bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex gap-2 flex-col p-3">
//                   <p className="text-gray-400 font-medium text-xl">SH</p>
//                   <div className="w-full flex justify-between items-end">
//                     <p className="text-gray-700 font-semibold text-3xl">1000</p>
//                     <i className="fa-solid fa-circle-info hover:text-gray-400 transition-all"></i>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full flex gap-6">
//                 <div className="w-56 h-24 rounded-lg bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex gap-2 flex-col p-3">
//                   <p className="text-gray-400 font-medium text-xl">DISPSEG</p>
//                   <div className="w-full flex justify-between items-end">
//                     <p className="text-gray-700 font-semibold text-3xl">1000</p>
//                     <i className="fa-solid fa-circle-info hover:text-gray-400 transition-all"></i>
//                   </div>
//                 </div>
//                 <div className="w-56 h-24 rounded-lg bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.15)] flex gap-2 flex-col p-3">
//                   <p className="text-gray-400 font-medium text-xl">PPU/PRU</p>
//                   <div className="w-full flex justify-between items-end">
//                     <p className="text-gray-700 font-semibold text-3xl">1000</p>
//                     <i className="fa-solid fa-circle-info hover:text-gray-400 transition-all"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-10/12 h-4/6 bg-white rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.1)]"></div>
//       </div>
//     </div>
//   );
// }
