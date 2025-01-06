import { useEffect, useState } from "react";
import { supabase } from "./lib/Supabase";
import { useParams } from "react-router";
import white_logo from "./assets/white_logo.png"
import { useNavigate } from "react-router";


interface userInfo {
  cep: string | null;
  city: string | null;
  cpf: string | null;
  created_at: string;
  email: string | null;
  full_name: string | null;
  gender: string | null;
  id: number;
  number: number | null;
  state: string | null;
  street: string | null;
  user_name: string | null;
};

function User() {
  const { user } = useParams();

  const [userData, setUserData] = useState<userInfo>({} as userInfo);

  const nav = useNavigate();

  useEffect(() => {
    async function getUser(user: string) {
      const { data, error } = await supabase
        .from("greenscape")
        .select("*")
        .eq("email", `${user}`)
        .single();

      if (error) {
        return;
      }
      setUserData(data);
      return;
    }
    getUser(user!);
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen w-screen font-inter">
      <div className="flex w-[900px] h-[560px] justify-start items-center border rounded-xl shadow-md">
        <div className="flex w-[250px] h-full justify-center items-center ">
          <div className="w-full h-full rounded-l-md bg-[radial-gradient(circle_at_left_bottom,_#1c4a39_0%,_rgba(20,82,65,0.6)_70%),_radial-gradient(circle_at_right_top,_#b5d288_0%,_rgba(20,82,65,0.2)_80%)] flex flex-col transition-all duration-500 ease-in-out gap-32 p-6">
            <img src={white_logo} className="w-[140px]" />
          </div>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-start p-6">
          <div className="flex flex-col w-full h-full gap-12 justify-start mt-6">
            <div className="flex w-full justify-center">
              <h1 className="text-third-green font-bold text-[36px]">
                Olá, {userData.user_name} !
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-start gap-5">
              <div className="flex flex-col w-full">
                <p className="text-third-green font-bold text-[20px]">
                  Informações Pessoais:
                </p>
                <div className="flex gap-7 border p-3 w-full bg-primary-brown bg-opacity-30 rounded-md">
                  <div className="w-[220px] truncate">
                    <p className="text-[18px] font-medium">Email</p>
                    <p>{userData.email}</p>
                  </div>
                  <div className="w-[95px] truncate">
                    <p className="text-[18px] font-medium">Usuário</p>
                    <p>{userData.user_name}</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">Gênero</p>
                    <p>{userData.gender}</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">CPF</p>
                    <p>{userData.cpf}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-third-green font-bold text-[20px]">
                  Endereço:
                </p>
                <div className="flex gap-7 border p-3 w-full bg-primary-brown bg-opacity-30 rounded-md">
                  <div className="w-[220px] truncate">
                    <p className="text-[18px] font-medium">Rua</p>
                    <p>{userData.street}</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">CEP</p>
                    <p>{userData.cep}</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">Número</p>
                    <p>{userData.number}</p>
                  </div>
                  <div className="w-[75px] truncate">
                    <p className="text-[18px] font-medium">Cidade</p>
                    <p>{userData.city}</p>
                  </div>
                  <div className="w-[75px] truncate">
                    <p className="text-[18px] font-medium">Estado</p>
                    <p>{userData.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <button
              onClick={() => nav("/")}
              className="bg-none border text-[16px] text-third-green border-third-green rounded-full w-[100px] h-[40px] hover:bg-third-green hover:text-white"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
