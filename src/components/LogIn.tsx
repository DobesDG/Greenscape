import logo from "../assets/green_logo.png";
import email from "../assets/email.png";
import lock from "../assets/lock.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthSchema } from "../lib/AuthSchema";
import { supabase } from "../lib/Supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const LogIn: React.FC = () => {
  const form = useForm<AuthSchema>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const nav = useNavigate();

  const onSubmit: SubmitHandler<AuthSchema> = async (authData: AuthSchema) => {
    const sucessLogInToast = () => toast.success("Conectado com sucesso!");

    const errorNotConfirmed = () => toast.error("Confirme seu email");

    const { error } = await supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password,
    });

    if (!error) {
      sucessLogInToast();
      nav(`/user/${authData.email}`);
      return;
    }

    if (error.message == "Email not confirmed") {
      errorNotConfirmed();
      return;
    }

    const { data } = await supabase
      .from("greenscape")
      .select("email")
      .eq("email", `${authData.email}`);

    if (data?.length == 0) {
      setError("email", {
        type: "custom",
        message: "E-mail não cadastrado",
      });
    } else {
      setError("password", {
        type: "custom",
        message: "Senha inválida",
      });
    }
    return;
  };

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
          <div className="flex flex-col justify-center items-center gap-5">
            <div>
              <div className="flex items-center mt-6 border w-[350px] h-[50px] bg-primary-brown bg-opacity-30">
                <img src={email} alt="" className="w-5 h-5 opacity-80 mx-3" />
                <input
                  type="text"
                  className="flex-grow pl-2 pr-4 py-2 text-base placeholder-stone-800 bg-transparent outline-none"
                  placeholder="Email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail inválido",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center border w-[350px] h-[50px] bg-primary-brown bg-opacity-30">
                <img src={lock} alt="" className="w-5 h-5 opacity-80 mx-3" />
                <input
                  type="password"
                  className="flex-grow pl-2 pr-4 py-2 text-base placeholder-stone-800 bg-transparent outline-none"
                  placeholder="Senha"
                  {...register("password", {
                    required: "Senha é obrigatório",
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="bg-none border text-[16px] text-third-green border-third-green rounded-full w-[210px] h-[50px] hover:bg-third-green hover:text-white">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
