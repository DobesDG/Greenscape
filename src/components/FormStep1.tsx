import { UseFormReturn } from "react-hook-form";
import { Input } from "./Input"
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
            })}
          />
        </div>
      </div>
    </div>
  );
};