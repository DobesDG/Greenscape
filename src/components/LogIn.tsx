import logo from "../assets/logo.png";
import email from "../assets/email.png";
import lock from "../assets/lock.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthSchema } from "../lib/AuthSchema";
import { supabase } from "../lib/Supabase";


export const LogIn:React.FC = () => {

    const form = useForm<AuthSchema>();
      const {
        register,
        handleSubmit,
      } = form;


    const onSubmit: SubmitHandler<AuthSchema> = (data) => {
      validateLogIn(data)
    };

    const validateLogIn = (authData: AuthSchema) => {
        console.log({authData})
        async function signInWithEmail(authData: AuthSchema) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: authData.email,
            password: authData.password,
          });
          console.log({data, error})
        }
        signInWithEmail(authData);
    }

    return (
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="relative mt-6">
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 w-[350px] h-[50px] placeholder-stone-800"
                  placeholder="Email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail inválido",
                    },
                  })}
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
                  type="password"
                  className="pl-10 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 w-[350px] h-[50px] placeholder-stone-800"
                  placeholder="Senha"
                  {...register("password", {
                    required: "Senha é obrigatório",
                  })}
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
          </form>
        </div>
      </div>
    );
}