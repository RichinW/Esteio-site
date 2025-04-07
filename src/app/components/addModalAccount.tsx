import { FC, useState } from "react";
import InputText from "./inputText";
import { AccountIn } from "@/type/accountType";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";

interface AddModalAccountProps {
  onAccountAdded: () => void;
}

const AddModalAccount: FC<AddModalAccountProps> = ({ onAccountAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccounts] = useState<AccountIn>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleUsernameChange = (value?: string) => {
    setAccounts((prevAccount) => ({
      ...prevAccount,
      username: value || "",
    }));
  };

  const handleEmailChange = (value?: string) => {
    setAccounts((prevAccount) => ({
      ...prevAccount,
      email: value || "",
    }));
  };

  const handlePasswordChange = (value?: string) => {
    setAccounts((prevAccount) => ({
      ...prevAccount,
      password: value || "",
    }));
  };

  const handleConfirmPassordChange = (value?: string) => {
    setAccounts((prevAccount) => ({
      ...prevAccount,
      confirm_password: value || "",
    }));
  };

  async function addAccount() {
    try {
      setLoading(true);
      const response = await api.post("/account/cadastrousuario", {
        username: account.username,
        email: account.email,
        password: account.password,
        confirm_password: account.confirm_password,
      });
      onAccountAdded();
      clearInputs();
      toast.success(`${response.data.message}`);
      setShowModal(false);
      setLoading(false);
    } catch (err) {
      toast.error("Erro ao cadastrar usuário. Tente novamente!");
      setLoading(false);
    }
  }

  const clearInputs = () => {
    setAccounts({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <>
      <div
        className="2xl:w-60 2xl:h-12 flex justify-between items-center 2xl:text-xl text-blue-400 2xl:py-2 2xl:px-4 xl:gap-2 xl:px-2 xl:py-1 2xl:rounded-md xl:rounded-sm hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p className="flex justify-center items-center m-0">
          Adicionar Usuário
        </p>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ToastContainer />
          <div className="rounded-lg w-5/12 h-5/6 bg-white flex flex-col justify-between px-6">
            <div className="w-full flex justify-between items-center 2xl:h-20 2xl:min-h-20 text-3xl xl:text-2xl xl:h-16 xl:min-h-20 text-gray-600 border-b-2 border-gray-100">
              <div className="flex items-center justify-between gap-4">
                <i className="fa-solid fa-book"></i>
                <p className="font-medium">Cadastro de Usuários</p>
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
                  <div className="flex flex-col gap-2 w-full">
                    <InputText
                      width="w-full"
                      height="2xl:h-16 xl:h-12"
                      placeholder="Nome de Usuário"
                      type="text"
                      input={account.username}
                      setInput={handleUsernameChange}
                      fontSize="2xl:text-lg xl:text-base"
                    />
                  </div>{" "}
                </div>
                <div className="flex w-11/12 h-full justify-between items-center">
                  <div className="flex flex-col gap-2 w-full">
                    <InputText
                      height="2xl:h-16 xl:h-12"
                      width="w-full"
                      placeholder="Email"
                      type="text"
                      input={account.email}
                      setInput={handleEmailChange}
                      fontSize="2xl:text-lg xl:text-base"
                    />
                  </div>
                </div>
                <div className="flex w-11/12 justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <InputText
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      placeholder="Senha"
                      type="password"
                      input={account.password || ""}
                      setInput={handlePasswordChange}
                      fontSize="2xl:text-lg xl:text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <InputText
                      height="2xl:h-16 xl:h-12"
                      width="2xl:w-80 xl:w-52"
                      placeholder="Confirmar Senha"
                      type="password"
                      input={account.confirm_password || ""}
                      setInput={handleConfirmPassordChange}
                      fontSize="2xl:text-lg xl:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full 2xl:h-24 2xl:min-h-24 xl:h-20 xl:min-h-20 flex justify-end items-center p-2 border-t-2 border-gray-100 gap-4">
              <input
                className="border-none bg-blue-500 2xl:text-xl xl:text-base font-light flex justify-center items-center text-white rounded-lg 2xl:w-32 2xl:h-12 xl:w-24 xl:h-10 hover:bg-blue-600 transition-all cursor-pointer"
                type="submit"
                value="Adicionar"
                disabled={loading}
                onClick={() => addAccount()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddModalAccount;
