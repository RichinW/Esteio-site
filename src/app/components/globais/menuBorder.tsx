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
      const checkToken = async () => {
        await verifyToken(router.push);
      };
      const get = async () => {
        const response = await getMe();
        setPermissions(response?.data.employee.account.permissions);
      };
      checkToken();
      get();
    }
  }, [router]);
  const rounter = useRouter();
  return (
    <div className="h-screen w-24 bg-[#030913] flex flex-col items-center justify-between py-8 transition-all hover:w-40 group">
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-table text-xl text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/producao")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Produção
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-user-tie text-lg text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/funcionario")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Funcionário
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-user text-lg text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/usuario")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Usuário
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-users text-lg text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/time")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Times
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-map text-lg text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/missao")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Missão
          </span>
        </div>

        <div className="w-12 h-12 flex justify-center items-center rounded-md">
          <i
            className="fa-solid fa-triangle-exclamation text-lg text-gray-400 transition-all hover:text-white"
            onClick={() => rounter.push("/sinalizacao/vertical")}
          ></i>
          <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
            Sinalização
          </span>
        </div>
      </div>
      <div className="w-12 h-12 flex justify-center items-center">
        <i
          className="fa-solid fa-door-open text-lg text-gray-400 transition-all hover:text-white"
          onClick={() => {
            clearAuthToken();
            rounter.push("/login");
          }}
        ></i>
        <span className="text-gray-400 group-hover:block hidden ml-2 text-sm transition-all">
          Logout
        </span>
      </div>
    </div>
  );
};
export default MenuBorder;
