"use client";
import { useEffect, useState } from "react";
import { AccountOut } from "@/type/accountType";
import { PermissionOut } from "@/type/permissionType";
import AddModalAccount from "../components/addModalAccount";
import api, { verifyToken, getMe } from "../services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Usuario() {
  const [accounts, setAccounts] = useState<AccountOut[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [view, setView] = useState<number | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<AccountOut[]>([]);
  const [permissions, setPermissions] = useState<PermissionOut[]>();
  const [page, setPage] = useState(1);
  const pageStart = 7 * (page - 1);
  const pageEnd = 7 * page;
  const [totalPage, setTotalPage] = useState<number>(1);
  const handleAddAccount = () => {
    listAccounts();
  };

  useEffect(() => {
    const checkToken = async () => {
      await verifyToken(router.push);
    };
    const get = async () => {
      const repsonse = await getMe();
      setPermissions(repsonse?.data.employee.account.permissions);
    };
    checkToken();
    get();
    listAccounts();
  }, [router]);

  useEffect(() => {
    listAccounts();
  }, [page]);

  async function listAccounts() {
    try {
      const response = await api.get(`/account/listausuario/${pageStart}/${pageEnd}`);
      setAccounts(response.data.accounts);
      setTotalPage(Math.ceil(response.data.total_items / 7));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const deleteAccount = async () => {
      if (selectedAccount.length <= 0) {
        toast.info("Selecione algum item para deletar");
      } else {
        try {
          for (const account of selectedAccount) {
            await api.delete(`/account/deleteusuario/${account.id}`);
          }
  
          setSelectedAccount([]);
          listAccounts();
          toast.success("Usuários excluídos com sucesso!");
        } catch (error) {
          toast.error("Erro ao tentar deletar os usuários");
        }
      }
    };

  const toggleAccount = (newAccount: AccountOut) => {
    setSelectedAccount((prevState) => {
      const isSelected = prevState.find(
        (account) => account.id === newAccount.id
      );

      if (isSelected) {
        return prevState.filter((account) => account.id !== newAccount.id);
      } else {
        return [...prevState, newAccount];
      }
    });
  };

  const toggleAllAccount = (allAccounts: AccountOut[]) => {
    setSelectedAccount((prevState) => {
      if (prevState.length === allAccounts.length) {
        return [];
      } else {
        return allAccounts;
      }
    });
  };

  const isAllSelected = () => {
    return selectedAccount.length === accounts.length;
  };

  const isProductionSelected = (id: number) => {
    return selectedAccount.some((account) => account.id === id);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-24 bg-white flex justify-between items-center px-12 shadow-lg">
          <p className="text-slate-700 font-semibold text-2xl">Usuários</p>
          <div></div>
        </div>
        <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center gap-6">
          <div className="w-10/12 flex justify-end items-center px-10">
            {permissions &&
              permissions.some((permission) => permission.name === "adm") && (
                <AddModalAccount onAccountAdded={handleAddAccount} />
              )}
          </div>
          <div className="w-10/12 flex justify-between px-10">
            <div className="flex items-center justify-center gap-8">
              <div className="flex justify-between items-center gap-2">
                <div
                  className={`w-5 h-5 border-2 rounded-sm cursor-pointer flex items-center justify-center ${
                    isAllSelected()
                      ? "bg-blue-400 border-blue-400"
                      : "border-gray-500"
                  }`}
                  onClick={() => toggleAllAccount(accounts)}
                >
                  {isAllSelected() && (
                    <i className="fa-solid fa-check text-white text-sm"></i>
                  )}
                </div>
                <p className="text-gray-500 text-xl font-medium">
                  {selectedAccount.length} Selected
                </p>
              </div>
              <div className="flex justify-between gap-2 items-center text-lg cursor-pointer"
              onClick={() => deleteAccount()}>
                <i className="fa-regular fa-trash-can text-blue-400"></i>
                <p className="text-gray-400">Deletar</p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-8">
              <div className="flex justify-between items-center gap-2 text-lg cursor-pointer">
                <i className="fa-solid fa-filter text-blue-400"></i>
                <p className="text-gray-400">Filtrar</p>
              </div>
              <div className="flex justify-between items-center gap-2 text-lg cursor-pointer">
                <i className="fa-solid fa-arrow-down-wide-short text-blue-400"></i>
                <p className="text-gray-400">Ordenar por</p>
              </div>
            </div>
          </div>
          <div className="w-10/12 h-4/5 bg-white rounded-lg flex flex-col justify-between px-10 shadow-gray-300 shadow-md">
            <div className="w-full h-full flex flex-col justify-start items-center">
              <div className="w-full h-20 border-b-2 border-gray-100 flex justify-between items-center text-gray-700 font-bold text-lg">
                <div className="w-[5.5%] flex items-center"></div>
                <div className="w-[4%] flex items-center gap-2">
                  <p>ID</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Nome</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p>Email</p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i>
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[9%] flex items-center gap-2">
                  <p></p>
                  <div className="flex flex-col justify-center text-sm text-gray-300">
                    {/* <i className="fa-solid fa-caret-up"></i>
                    <i className="fa-solid fa-caret-down"></i> */}
                  </div>
                </div>
                <div className="w-[4%] flex items-center"></div>
              </div>
              {!loading ? (
                accounts.length > 0 ? (
                  accounts.map((account) => (
                    <div
                      className={`w-full ${
                        view !== null
                          ? account.id === view
                            ? "h-40"
                            : "h-12"
                          : "h-16"
                      } border-b-2 border-gray-100 flex flex-col gap-3 justify-center items-center text-gray-400 text-lg transition-all`}
                    >
                      <div className="flex w-full justify-between">
                        <div className="w-[5.5%] flex items-center justify-center">
                          <div
                            className={`transition-all w-5 h-5 flex justify-center items-center border-2 rounded-sm ${
                              isProductionSelected(account.id)
                                ? "bg-blue-400 border-blue-400"
                                : "border-gray-200"
                            }`}
                            onClick={() => toggleAccount(account)}
                          >
                            {isProductionSelected(account.id) && (
                              <i className="fa-solid fa-check text-white text-sm"></i>
                            )}
                          </div>
                        </div>
                        <div className="w-[4%] flex items-center">
                          {account.id}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {account.username}
                        </div>
                        <div className="w-[10%] flex items-center">
                          {account.email}
                        </div>
                        <div className="w-[9%] flex items-center"></div>
                        <div className="w-[9%] flex items-center"></div>
                        <div className="w-[9%] flex items-center"></div>
                        <div className="w-[9%] flex items-center"></div>

                        <div className="w-[4%] flex items-center text-xl">
                          <i
                            className={
                              view === account.id
                                ? "fa-solid fa-chevron-up"
                                : "fa-solid fa-chevron-down"
                            }
                            onClick={() => {
                              setView(view === account.id ? null : account.id);
                            }}
                          ></i>
                        </div>
                      </div>
                      {view === account.id && (
                        <div className="flex w-full justify-between">
                          <div className="w-[5.5%] flex items-center justify-center"></div>
                          <div className="w-[4%] flex items-center"></div>
                          <div className="w-[10%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[9%] flex items-center"></div>
                          <div className="w-[4%] flex items-center text-xl cursor-pointer"></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="w-full h-20 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 text-xl font-semibold">
                    <p>Nenhum usuário cadastrado.</p>
                  </div>
                )
              ) : accounts.length === 0 ? (
                <div className="w-full h-20 border-b-2 border-gray-100 flex justify-center items-center text-gray-500 text-xl font-semibold">
                  <p>Carregando...</p>
                </div>
              ) : null}
            </div>
            <div className="w-full h-40 flex items-center text-gray-600 gap-4">
              <p className="font-medium">Páginas</p>
              <div className="w-20 h-8 border-2 border-gray-300 rounded-md justify-center items-center gap-2">
                <input
                  className="border-none focus:ring-0 focus:outline-none w-full h-full bg-transparent px-2"
                  type="text"
                />
              </div>
              <div className="flex items-center gap-6 font-semibold text-gray-400">
                <i className="fa-solid fa-angles-left"></i>
                <i className="fa-solid fa-angle-left"></i>
                {Array.from({ length: totalPage }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-2 ${
                      index + 1 === page ? "text-blue-400 underline" : ""
                    }`}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <i className="fa-solid fa-angle-right"></i>
                <i className="fa-solid fa-angles-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
