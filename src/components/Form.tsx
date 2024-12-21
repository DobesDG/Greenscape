import { useForm, SubmitHandler } from "react-hook-form";
import useLocalStore from "../hooks/useLocalStorage";
import { Input } from "./Input";
import left_arrow from "../assets/left-arrow.svg";

interface UserData {
  name: string;
  email: string;
  tel: string;
  cpfCnpj: string;
}

interface VehicleData {
  category: string;
  fipe: string;
  useType: string;
}

interface Address {
  cep: string;
  street: string;
  neighborhood: string;
  number: number;
  complement: string;
  state: string;
  city: string;
}

interface Schema {
  userData: UserData;
  vehicleData: VehicleData;
  address: Address;
}

interface FormProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const Form: React.FC<FormProps> = ({ currentStep, setCurrentStep }) => {
  const [storedData, setStoredData] = useLocalStore<Schema>(
    "userData",
    {} as Schema
  );

  const form = useForm<Schema>({ defaultValues: storedData });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Schema> = (data) => {
    submitHandle(data);
  };

  const submitHandle = (data: Schema) => {
    setStoredData(data);
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
    console.log(data);
  };

  return (
    <section className="flex flex-col w-[800px] mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && (
          <>
            <div className="flex w-full gap-4" key="step-0-1">
              <div className="w-full">
                <Input
                  error={errors.userData?.name}
                  placeholder="Seu nome"
                  {...register("userData.name", {
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
            </div>
            <div className="flex w-full gap-4" key="step-0-2">
              <div className="w-full">
                <Input
                  error={errors.userData?.tel}
                  placeholder="Telefone"
                  {...register("userData.tel", {
                    required: "Telefone é obrigatório",
                  })}
                />
              </div>
              <div className="w-full">
                <Input
                  error={errors.userData?.cpfCnpj}
                  placeholder="CPF ou CNPJ"
                  {...register("userData.cpfCnpj", {
                    required: "CPF/CNPJ é obrigatório",
                  })}
                />
              </div>
            </div>
          </>
        )}
        <section className="flex justify-center items-center mt-6">
          <button
            type="submit"
            className="px-8 py-5 w-[300px] h-[67.5px] border rounded-full text-white font-bold bg-default-green hover:bg-hover-green"
          >
            <div className="flex text-center justify-end items-center">
              <div className="w-full flex justify-center">
                <p className="text-[20px]">Avançar</p>
              </div>
              <img src={left_arrow} alt="Ícone avançar" className="ml-4 flex" />
            </div>
          </button>
        </section>
      </form>
    </section>
  );
};
