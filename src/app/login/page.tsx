"use client";
import InputText from "../components/inputText";
import { useState } from "react";
import ButtonDefault from "../components/buttonDefault";
import api, { setAuthToken, clearAuthToken } from "../services/api";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (password && username) {
      setIsLoading(true);
      const body = {
        username: username,
        password: password,
      };

      try {
        const response = await api.post("/account/login", body);
        if (response.status === 200) {
          router.push("/producao");
        } else {
          toast.error(response.data.message);
          }
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err) && err.response) {
          const errorData = err.response.data;

          if (errorData.message) {
            toast.error(errorData.message);
          } else if (errorData.cpf) {
            errorData.cpf.forEach((message: string) => {
              toast.error(message);
            });
          } else {
            toast.error("Erro desconhecido");
          }
        } else {
          toast.error("Erro desconhecido");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!username) toast.error("Coloque um nome de usuário válida!");
      else toast.error("Coloque uma senha válida!");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100 justify-center items-center">
      <div className="w-2/6 h-3/5 bg-white shadow-gray-300 shadow-xl rounded-lg flex flex-col items-center justify-evenly">
        <div
          className={`logo-container relative w-24 h-24 bg-white ${
            !isLoading ? "shadow-md shadow-gray-300" : ""
          } rounded-full flex justify-center items-center`}
        >
          <div
            className={`absolute inset-0 rounded-full flex justify-end items-center ${
              isLoading
                ? "rotating border-blue-500 border-4 border-t-white"
                : ""
            }`}
          ></div>
          <i className="fa-solid fa-road text-4xl text-gray-800 z" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8 ">
          <InputText
            width="96"
            placeholder="Nome de Usuário"
            input={username}
            type="text"
            setInput={setUsername}
            icone="fa-solid fa-address-card"
          />
          <InputText
            width="96"
            placeholder="Senha"
            input={password}
            type={viewPassword ? "text" : "password"}
            setInput={setPassword}
            icone={viewPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setViewPassword(!viewPassword)}
          />
          <ButtonDefault
            text="Entrar"
            bgColor="bg-blue-400"
            color="text-white"
            onClick={login}
          />
          <p className="text-gray-400 underline">Esqueci minha senha</p>
        </div>
      </div>
    </div>
  );
}
