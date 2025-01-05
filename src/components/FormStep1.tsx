import { UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { UserSchema } from "../lib/UserSchema";

interface FormStepsProps {
  form: UseFormReturn<UserSchema, unknown, undefined>;
}

export const FormStep1: React.FC<FormStepsProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[327px] gap-4">
        <div className="w-full">
          <Input
            error={errors.userData?.userName}
            placeholder="Nome de usuário"
            {...register("userData.userName", {
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Insira um nome de usuário com mais de 3 caracteres",
              },
              maxLength: {
                value: 20,
                message: "Insira um nome de usuário com menos de 20 caracteres",
              },
            })}
          />
        </div>
        <div className="w-full">
          <Input
            error={errors.userData?.email}
            placeholder="E-mail"
            {...register("userData.email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido",
              },
            })}
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            error={errors.userData?.password}
            placeholder="Senha"
            {...register("userData.password", {
              required: "Senha é obrigatório",
              minLength: {
                value: 9,
                message: "Insira uma senha com mais de 9 caracteres",
              },
            })}
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            error={errors.userData?.repassword}
            placeholder="Repita a senha"
            {...register("userData.repassword", {
              required: "Senha é obrigatório",
              validate: (value: string) => {
                if (form.watch("userData.password") != value) {
                  return "Senhas devem ser iguais";
                }
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};
