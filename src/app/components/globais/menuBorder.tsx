"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import api from "../../services/api";
import { useEffect, useState } from "react";

const MenuBorder = () => {
  const pathname = usePathname();
  const rounter = useRouter();
  const [viewOptions, setViewOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Producao")

  useEffect(() => {
    if (pathname !== "/login/") {
      const checkAndFetch = async () => {
        try {
        } catch (error: any) {
          if (error.response?.status !== 401) {
            console.error("Erro inesperado ao verificar o token:", error);
          }
        }
      };

      checkAndFetch();
    }
  }, [pathname]);

  return (
    <div
      className={`h-screen 2xl:w-24 xl:w-20 bg-[#030913] ${
        pathname !== "/login/" ? "" : "hidden"
      } flex flex-col items-center justify-between py-8 transition-all 2xl:hover:w-40 xl:hover:w-64 group`}
    >
      <div className="flex flex-col gap-6">
        <div className="w-44 text-xl justify-start items-center group-hover:flex text-white gap-2">
          <div className="flex group-hover:justify-start justify-center">
            <img
              src="/NexoraLogo.png"
              alt=""
              className="xl:w-12 flex justify-center"
            />
          </div>
          <div className="group-hover:block hidden font-semibold">Nexora</div>
        </div>
        <div className="w-44 text-xs justify-center flex gap-1 group-hover:justify-start text-gray-400">
          <div>MENU</div>
          <div className="hidden group-hover:block">PRINCIPAL</div>
        </div>
        <div
          className="w-44 flex flex-col justify-center items-center group-hover:items-start gap-4"
          onClick={() => {
            setViewOptions(!viewOptions);
            if(pathname !== "/producao/")
              rounter.push("/producao");
            setSelectedOption("Producao")
          }}
        >
          <div className={`flex justify-start items-start cursor-pointer hover:text-white ${
                pathname === "/producao/" ? "text-white" : "text-gray-400"
              }`}>
            <i
              className={`fa-solid fa-table 2xl:text-xl xl:text-base transition-all`}
            ></i>
            <span
              className={`group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all`}
            >
              Produção
            </span>
          </div>
          {viewOptions && selectedOption === "Producao" && (
            <div className="ml-2 group-hover:flex hidden flex-col justify-center items-start text-sm">
              <div
                className={`w-32 h-8 pl-2 ${
                  pathname == "/producao/"
                    ? "border-l-white"
                    : "border-l-gray-300"
                } border-l-2 flex justify-start items`}
              >
                <div
                  className={`w-full h-full rounded-sm ${
                    pathname == "/producao/"
                      ? "bg-gray-700 text-white"
                      : "bg-transparent text-gray-300"
                  } flex justify-start items-center gap-3 pl-3`}
                >
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <div className="font-medium">Cadastrar</div>
                </div>
              </div>
              <div
                className={`w-32 h-8 pl-2 ${
                  pathname == "/producao/ver"
                    ? "border-l-white"
                    : "border-l-gray-700"
                } border-l-2 flex justify-start items`}
              >
                <div
                  className={`w-full h-full rounded-sm ${
                    pathname == "/producao/ver"
                      ? "bg-gray-700 text-white"
                      : "bg-transparent text-gray-300"
                  } flex justify-start items-center gap-3 pl-3`}
                >
                  <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                  <div className="font-medium">Ver</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className={`w-44 h-auto flex flex-col justify-center items-center group-hover:items-start rounded-md gap-4 hover:text-white ${
            pathname === "/usuario/" ? "text-white" : "text-gray-400"
          }`}
          onClick={() => {
            setViewOptions(!viewOptions);
            if(pathname !== "/usuario/")
              rounter.push("/usuario");
            setSelectedOption("Usuario")
          }}
        >
          <div className="flex justify-start items-start cursor-pointer">
            <i
              className={`fa-solid fa-user 2xl:text-xl xl:text-bas transition-all `}
            ></i>
            <span
              className={`group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all`}
            >
              Usuário
            </span>
          </div>
          {/* {viewOptions === "Usuario" && (
            <div className="ml-2 group-hover:flex hidden flex-col justify-center items-start text-sm">
              <div
                className={`w-32 h-8 pl-2 ${
                  pathname == "/usuario/"
                    ? "border-l-white"
                    : "border-l-gray-300"
                } border-l-2 flex justify-start items`}
              >
                <div
                  className={`w-full h-full rounded-sm ${
                    pathname == "/usuario/"
                      ? "bg-gray-700 text-white"
                      : "bg-transparent text-gray-300"
                  } flex justify-start items-center gap-3 pl-3`}
                >
                  <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                  <div className="font-medium">Cadastrar</div>
                </div>
              </div>
              <div
                className={`w-32 h-8 pl-2 ${
                  pathname == "/usuario/ver"
                    ? "border-l-white"
                    : "border-l-gray-700"
                } border-l-2 flex justify-start items`}
              >
                <div
                  className={`w-full h-full rounded-sm ${
                    pathname == "/usuario/ver"
                      ? "bg-gray-700 text-white"
                      : "bg-transparent text-gray-300"
                  } flex justify-start items-center gap-3 pl-3`}
                >
                  <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                  <div className="font-medium">Ver</div>
                </div>
              </div>
            </div>
          )} */}
        </div>

        {/* <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-user 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/usuario")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Usuário
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-user-tie 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/funcionario")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Funcionário
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-users 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/time")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Equipe
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-map 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/missao")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Rota
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-triangle-exclamation 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/sinalizacao/vertical")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Levantamento
          </span>
        </div> */}
      </div>
      <div className="w-44 h-12 flex justify-center items-center group-hover:justify-start hover:text-white text-gray-400">
        <i
          className="fa-solid fa-door-open 2xl:text-lg xl:text-base transition-all"
          onClick={() => {
            rounter.push("/login");
          }}
        ></i>
        <span className="group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
          Logout
        </span>
      </div>
    </div>
  );
};
export default MenuBorder;
