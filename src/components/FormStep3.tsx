import { UseFormReturn } from "react-hook-form";
import { Input } from "./Input";
import { UserSchema } from "../lib/UserSchema";
import { Dropdown, States } from "./Dropdown";
import { useMask } from "@react-input/mask";
import cep from "cep-promise" ;
import { useEffect } from "react";

interface FormStepsProps {
  form: UseFormReturn<UserSchema, unknown, undefined>;
}

export const FormStep3: React.FC<FormStepsProps> = ({ form }) => {
    const {
      register,
      watch,
      setValue,
      formState: { errors },
    } = form;

    const cepValue = watch("address.cep");

    useEffect(() => {
      const cepFinder = async (cepString: string) => {
        const cepRegex = /^\d{5}.\d{3}$/;
        if (cepRegex.test(cepString)) {
          try {
            const cepData = await cep(cepString.replace("-",""));
            setValue("address.city",cepData.city)
            setValue("address.street", cepData.street);
            setValue("address.state", States[cepData.state as keyof typeof States]);
            console.log(cepData);
          } catch (error) {
            console.log(error);
          }
        }
      };
      cepFinder(cepValue);
      console.log(cepValue);
    }, [cepValue, setValue]);

    const { ref, ...rest } = register("address.cep", {
      required: "Nome completo é obrigatório",
    });

    const cepRef = useMask({
      mask: "_____-___",
      replacement: { _: /\d/ },
    });

    

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[327px] gap-4">
        <div className="w-full">
          <Input
            error={errors.address?.cep}
            placeholder="Seu CEP"
            {...rest}
            ref={(e) => {
              ref(e);
              cepRef.current = e as HTMLInputElement;
            }}
          />
        </div>
        <div className="w-full">
          <Input
            error={errors.address?.street}
            placeholder="Nome da sua rua"
            {...register("address.street", {
              required: "Nome da rua é obrigatório",
            })}
          />
        </div>
        <div className="w-full">
          <Input
            type="number"
            error={errors.address?.number}
            placeholder="N° da rua"
            {...register("address.number", {
              required: "Número da rua é obrigatório",
            })}
          />
        </div>
        <div className="w-full">
          <Dropdown
            type={"state"}
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
