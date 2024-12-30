/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler, UseFormReturn, FieldErrors } from "react-hook-form";
import useLocalStore from "../hooks/useLocalStorage";
import { Stepper } from "./Stepper";
import { useState } from "react";
import { Address, UserData, PersonalData, UserSchema,  } from "../lib/UserSchema";
import { supabase } from "../lib/Supabase";
import { FormStep1 } from "./FormStep1";
import { FormStep2 } from "./FormStep2";
import { FormStep3 } from "./FormStep3";


const hasIncompleteData = (info: UserData | PersonalData | Address | null) => {
  if (!info) return true;
  return Object.values(info).some(
    (value) => value === null || value === undefined || value === ""
  );
};

async function createUser(data: UserSchema) {
        const {error} = await supabase
            .from("greenscape")
            .select("email")
            .eq('email', `${data.userData.email}`)

            if (error) {
              await supabase.from("greenscape").insert({
                user_name: data.userData.userName,
                email: data.userData.email,
                full_name: data.personalData.fullName,
                cpf: data.personalData.cpf,
                cep: data.address.cep,
                street: data.address.state,
                number: data.address.number,
                state: data.address.state,
                city: data.address.city,
              });
              await supabase.auth.signUp({
                email: data.userData.email,
                password: data.userData.password
              })
            }
      };

export const Form: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(0)

  const [storedData, setStoredData] = useLocalStore<UserSchema>("userData", {} as UserSchema);

  const form = useForm<UserSchema>({ defaultValues: storedData });
  const {
    handleSubmit,
    getValues,
  } = form;

function resetFields(data: UserSchema) {
  const getDefaultValue = (key: string): any => {
     return key === "number" ? 0 : "";
  };

  const reset = (obj: Record<string, unknown>, parentKey: string = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        reset(value as Record<string, unknown>, fullKey); 
      } else {
        form.setValue(fullKey as keyof UserSchema, getDefaultValue(key));
      }
    });
  };
  reset(data as any);
  setCurrentStep(0);
  setStoredData({} as UserSchema)
}

  const onSubmit: SubmitHandler<UserSchema> = (data) => {
    setStoredData(data);
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
      return;
    }
    createUser(data);
    resetFields(data);
  };


const isValid = (
) => {
   const errors = form.formState.errors as FieldErrors<UserSchema>;
   const steps = [
     {
       data: getValues("userData"),
       errorKey: "userData" as keyof FieldErrors<UserSchema>,
     },
     {
       data: getValues("personalData"),
       errorKey: "personalData" as keyof FieldErrors<UserSchema>,
     },
     {
       data: getValues("address"),
       errorKey: "address" as keyof FieldErrors<UserSchema>,
     },
   ];
   
   let maxValidStep = 0;

   for (let i = 0; i < steps.length; i++) {
     const { data, errorKey } = steps[i];

     if (!data || hasIncompleteData(data) || errors[errorKey]) {
       break;
     }
     maxValidStep = i + 1;
   }
   return maxValidStep;
};

  return (
    <>
      <section>
        <Stepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          numberOfSteps={3}
          isValid={isValid()}
        />
      </section>
      <section className="flex flex-col w-[800px] mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormBody form={form} steps={currentStep}/>
          <section className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="bg-none border text-third-green border-third-green rounded-full w-[210px] h-[50px]"
            >
              <div className="flex text-center justify-end items-center">
                <div className="w-full flex justify-center">
                  <p className="text-base">{currentStep == 2 ? "Completar" : "Avançar"}</p>
                </div>
              </div>
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

const FormBody = ({form, steps}:{form:UseFormReturn<UserSchema, unknown, undefined>, steps:number}) => {
  switch (steps) {
    case 0:
      return <FormStep1 form={form}/>;
    case 1:
      return <FormStep2 form={form}/>;
    case 2:
      return <FormStep3 form={form} />;
  }
}
