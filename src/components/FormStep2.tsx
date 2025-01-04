import { UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { UserSchema } from "../lib/UserSchema";
import { Dropdown } from "./Dropdown";


interface FormStepsProps {
  form: UseFormReturn<UserSchema, unknown, undefined>;
}

export const FormStep2: React.FC<FormStepsProps> = ({ form }) => {
    const {
      register,
      formState: { errors },
    } = form;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[327px] gap-4">
        <div className="w-full">
          <Input
            error={errors.personalData?.fullName}
            placeholder="Nome completo"
            {...register("personalData.fullName", {
              required: "Nome completo é obrigatório",
              maxLength: {
                value: 80,
                message: "Número de caracteres excedido",
              },
            })}
          />
        </div>
        <div className="w-full">
          <Input
            error={errors.personalData?.cpf}
            placeholder="CPF"
            {...register("personalData.cpf", {
              required: "CPF é obrigatório",
              maxLength: { value: 11, message: "CPF inválido" },
              minLength: { value: 11, message: "CPF inválido" },
            })}
          />
        </div>
        <div className="w-full">
          <Dropdown
            type={"gender"}
            error={errors.personalData?.gender}
            setValue={form.setValue}
            getValue={form.getValues}
            {...register("personalData.gender", {
              required: "Gênero é obrigatório",
            })}
          />
        </div>
      </div>
    </div>
  );
};
