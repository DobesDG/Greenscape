import { UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { UserSchema } from "../lib/UserSchema";
import { Dropdown } from "./Dropdown";

interface FormStepsProps {
  form: UseFormReturn<UserSchema, unknown, undefined>;
}

export const FormStep3: React.FC<FormStepsProps> = ({ form }) => {
    const {
      register,
      formState: { errors },
    } = form;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[327px] gap-4">
        <div className="w-full">
          <Input
            error={errors.address?.street}
            placeholder="Nome da sua rua"
            {...register("address.street", {
              required: "Nome da rua é obrigatório",
            })}
          />
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-fit">
            <Input
              error={errors.address?.cep}
              placeholder="Seu CEP"
              {...register("address.cep", {
                required: "Nome completo é obrigatório",
              })}
            />
          </div>
          <div className="w-fit">
            <Input
            type="number"
              error={errors.address?.number}
              placeholder="N° da rua"
              {...register("address.number", {
                required: "Número da rua é obrigatório",
              })}
            />
          </div>
        </div>
        <div className="w-full">
          <Dropdown
            type = {"state"}
            error={errors.address?.state}
            setValue={form.setValue}
            getValue={form.getValues}
            {...register("address.state", {
              required: "Estado é obrigatório",
            })}
          />
        </div>
        <div className="w-full">
          <Input
            error={errors.address?.city}
            placeholder="Nome da sua cidade"
            {...register("address.city", {
              required: "Cidade é obrigatório",
            })}
          />
        </div>
      </div>
    </div>
  );
};
