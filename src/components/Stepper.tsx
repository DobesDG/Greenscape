import React from "react";
import line from "../assets/gradient-line.png";

interface StepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  numberOfSteps: number;
  isValid: number;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  setCurrentStep,
  numberOfSteps,
  isValid
}) => {
  const activeColor = (index: number) =>
    currentStep == index
      ? ["bg-light-purple", "text-light-purple"]
      : ["bg-light-gray", "text-light-gray"];
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  const labelName = ["Crie sua conta", "Seus Dados", "Endereço"];

  const possibleSteps = (index: number, isValid: number) => {
    if (index <= isValid-1) {
      return (setCurrentStep(index))
    }
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex items-center">
        {Array.from({ length: numberOfSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-center items-center gap-3 mb-8">
              <div
                onClick={() => possibleSteps(index, isValid)}
                className={`flex w-12 h-12 rounded-full justify-center items-center text-white text-base font-bold ${
                  activeColor(index)[0]
                }`}
              >
                0{index + 1}
              </div>
              <label
                htmlFor=""
                className={`text-base font-bold ${activeColor(index)[1]}`}
              >
                {labelName[index]}
              </label>

              {isFinalStep(index) ? null : (
                <img src={line} alt="" className="w-[37px] pr-3" />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      <h3 className="text-2xl">{labelName[currentStep]}</h3>
    </div>
  );
};
