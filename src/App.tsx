import "./index.css"
import { useState } from "react";
import { Form } from "./components/Form";
import { LogIn } from "./components/LogIn";

function App() {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(true)


  return (
    <div className="flex justify-center items-center min-h-screen w-screen font-inter">
      <div className="flex w-[1200px] h-[600px] border rounded-xl shadow-md">
        {isFormOpen && (
          <LogIn/>
        )}
        {!isFormOpen && (
          <div
            className={`transition-all delay-1000 duration-500 ease-in-out ${
              isFormOpen ? "translate-x-0" : "translate-x-[50%]"
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
