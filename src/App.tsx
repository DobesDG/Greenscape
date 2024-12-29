import "./index.css"
import logo from './assets/logo.png'
import email from './assets/email.png'
import lock from "./assets/lock.png";
import { useState } from "react";
import { Form } from "./components/Form";

function App() {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(true)

  return (
    <div className="flex justify-center items-center min-h-screen w-screen font-inter">
      <div className="flex w-[1200px] h-[600px] border rounded-xl shadow-md">
        {isFormOpen && (
          <div className="flex flex-col h-full w-screen">
            <div className="p-6 w-fit">
              <img src={logo} className="w-[140px]" alt="" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-third-green font-bold text-[36px]">
                Bem vindo de volta!
              </h1>
              <h1 className="text-third-green font-normal text-[16px] mt-16">
                Insira seus dados:
              </h1>
              <div className="flex flex-col gap-5 justify-center items-center">
                <div className="relative mt-6">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 w-[350px] h-[50px] placeholder-stone-800"
                    placeholder="Email"
                  />
                  <div
                    className="absolute inset-y-0 left-0 pl-3 
                        flex items-center 
                        pointer-events-none"
                  >
                    <img src={email} alt="" className="w-5 h-5 opacity-80" />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 w-[350px] h-[50px] placeholder-stone-800"
                    placeholder="Senha"
                  />
                  <div
                    className="absolute inset-y-0 left-0 pl-3 
                        flex items-center 
                        pointer-events-none"
                  >
                    <img src={lock} alt="" className="w-5 h-5 opacity-80" />
                  </div>
                </div>
                <button className="bg-none border text-[16px] text-third-green border-third-green rounded-full w-[210px] h-[50px] mt-[20px]">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        )}
        {!isFormOpen && (
          <div
            className={`transition-all delay-1000 duration-500 ease-in-out ${
              isFormOpen
                ? "translate-x-0"
                : "translate-x-[50%]"
            }`}
          >
            <Form />
          </div>
        )}
        <div className="flex w-full h-full justify-center items-center">
          <div
            className={`w-full h-full bg-[radial-gradient(circle_at_left_bottom,_#1c4a39_0%,_rgba(20,82,65,0.6)_70%),_radial-gradient(circle_at_right_top,_#b5d288_0%,_rgba(20,82,65,0.2)_80%)] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
              isFormOpen
                ? "rounded-r-xl -translate-x-0"
                : "rounded-l-xl -translate-x-[201%]"
            }`}
          >
            <h1 className="text-white font-bold text-[36px]">Olá, amigo!</h1>
            <h1 className="text-white font-light text-[16px] mt-[30px]">
              Adicione as suas infomações<br></br> e inicia sua jornada conosco
            </h1>
            <button
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="bg-none border text-white border-white rounded-full w-[210px] h-[50px] mt-[50px]"
            >
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
