import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import useLocalStore from "../hooks/useLocalStorage";
import { Input } from "./Input";
import left_arrow from "../assets/left-arrow.svg";
import { Stepper } from "./Stepper";
import { useState } from "react";

interface UserData {
  userName: string;
  email: string;
  tel: string;
  password: string;
}

interface PersonalData {
  fullName: string;
  cpf: string;
  gender: string;
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
  personalData: PersonalData;
  address: Address;
}


export const Form: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(0)

  const [storedData, setStoredData] = useLocalStore<Schema>("userData", {} as Schema);

  const form = useForm<Schema>({ defaultValues: storedData });
  const {
    register,
    handleSubmit,
    getValues,
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

  const userDataInfo = getValues("userData")
  const personalDataInfo = getValues("personalData");
  const addressInfo = getValues("address");

const isValid = (
  errors: FieldErrors,
  userDataInfo: Record<string, any> | null,
  personalDataInfo: Record<string, any> | null,
  addressInfo: Record<string, any> | null
) => {
  const hasIncompleteData = (info: Record<string, any> | null) => {
    if (!info) return true;
    return Object.values(info).some(value => value === null || value === undefined || value === '');
  };

  let step1IsValid = 0;
  let step2IsValid = 0;
  let step3IsValid = 0;

  if (userDataInfo && !hasIncompleteData(userDataInfo)) {
    step1IsValid = !errors.userData ? 1 : 0;
  }
  if (personalDataInfo && step1IsValid && !hasIncompleteData(personalDataInfo)) {
    step2IsValid = !errors.personalData ? 2 : 0;
  }
  if (addressInfo && step2IsValid && !hasIncompleteData(addressInfo)) {
    step3IsValid = !errors.addressData ? 3 : 0;
  }
  const isValidArray = [step1IsValid, step2IsValid, step3IsValid];
  return isValidArray.sort()[2];
};


  return (
    <>
      <section>
        <Stepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          numberOfSteps={3}
          isValid={isValid(errors, userDataInfo, personalDataInfo, addressInfo)}
        />
      </section>
      <section className="flex flex-col w-[800px] mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && (
            <>
              <div className="flex w-full gap-4">
                <div className="w-full">
                  <Input
                    error={errors.userData?.userName}
                    placeholder="Seu nome de usuário"
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
              </div>
              <div className="flex w-full gap-4">
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
                    error={errors.userData?.password}
                    placeholder="Insira sua senha"
                    {...register("userData.password", {
                      required: "Senha é obrigatório",
                    })}
                  />
                </div>
              </div>
            </>
          )}
          {currentStep == 1 && (
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col w-[327px] gap-4">
                <div className="w-full">
                  <Input
                    error={errors.personalData?.fullName}
                    placeholder="Seu nome completo"
                    {...register("personalData.fullName", {
                      required: "Nome completo é obrigatório",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    error={errors.personalData?.cpf}
                    placeholder="Seu CPF"
                    {...register("personalData.cpf", {
                      required: "CPF é obrigatório",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    error={errors.personalData?.gender}
                    placeholder="Seu genêro"
                    {...register("personalData.gender", {
                      required: "Gênero é obrigatório",
                    })}
                  />
                </div>
              </div>
            </div>
          )}
          {currentStep == 2 && (
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col w-[327px] gap-4">
                <div className="w-full">
                  <Input
                    error={errors.address?.cep}
                    placeholder="Seu CEP"
                    {...register("address.cep", {
                      required: "Nome completo é obrigatório",
                    })}
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
                    error={errors.address?.number}
                    placeholder="Número da sua rua"
                    {...register("address.number", {
                      required: "Número da rua é obrigatório",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    error={errors.address?.complement}
                    placeholder="Insira o complemento de endereço"
                    {...register("address.complement", {
                      required: "Complemento é obrigatório",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    error={errors.address?.neighborhood}
                    placeholder="Nome do seu bairro"
                    {...register("address.neighborhood", {
                      required: "Bairro é obrigatório",
                    })}
                  />
                </div>
                <div className="w-full">
                  <Input
                    error={errors.address?.state}
                    placeholder="Escolha o seu estado"
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
                <img
                  src={left_arrow}
                  alt="Ícone avançar"
                  className="ml-4 flex"
                />
              </div>
            </button>
          </section>
        </form>
      </section>
    </>
  );
};
