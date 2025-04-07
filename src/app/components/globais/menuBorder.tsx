"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import api, { getMe, verifyToken, clearAuthToken } from "../../services/api";
import { useEffect, useState } from "react";
import { PermissionOut } from "@/type/permissionType";

const MenuBorder = () => {
  const router = useRouter();
  const [permissions, setPermissions] = useState<PermissionOut[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/login/") {
      const checkAndFetch = async () => {
        try {
          const response = await getMe();
          setPermissions(response?.data.employee.account.permissions);
        } catch (error: any) {
          if (error.response?.status !== 401) {
            console.error("Erro inesperado ao verificar o token:", error);
          }
        }
      };

      checkAndFetch();
    }
  }, [pathname]);
  const rounter = useRouter();
  return (
    <div className={`h-screen 2xl:w-24 xl:w-20 bg-[#030913] ${pathname !== "/login/" ? "" : "hidden"} flex flex-col items-center justify-between py-8 transition-all 2xl:hover:w-40 xl:hover:w-36 group`}>
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-table 2xl:text-xl xl:text-base text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/producao")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
            Produção
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
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
        </div>
      </div>
      <div className="w-12 h-12 flex justify-center items-center">
        <i
          className="fa-solid fa-door-open 2xl:text-lg xl:text-base text-gray-400 transition-all hover:text-white"
          onClick={() => {
            clearAuthToken();
            rounter.push("/login");
          }}
        ></i>
        <span className="text-gray-400 group-hover:block hidden ml-2 2xl:text-sm xl:text-xs transition-all">
          Logout
        </span>
      </div>
    </div>
  );
};
export default MenuBorder;
