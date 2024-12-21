import React from "react";
import line from "../assets/gradient-line.png";

interface StepperProps {
  currentStep: number;
  numberOfSteps: number;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  numberOfSteps,
}) => {
  const activeColor = (index: number) =>
    currentStep == index
      ? ["bg-light-purple", "text-light-purple"]
      : ["bg-light-gray", "text-light-gray"];
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  const labelName = ["Seus Dados", "Dados do Veículo", "Endereço"];

  return (
    <div className="flex items-center">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex justify-center items-center gap-3 mb-8">
            <div
              className={`flex w-12 h-12 rounded-full justify-center items-center text-white text-base font-bold ${
                activeColor(index)[0]
              }`}
            >
              0{index}
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
  );
};
