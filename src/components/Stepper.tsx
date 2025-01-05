import React from "react";

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
  isValid,
}) => {
  const activeColor = (index: number) =>
    currentStep == index
      ? [
          "bg-[radial-gradient(circle_at_left_bottom,_#1c4a39_0%,_rgba(20,82,65,0.6)_70%),_radial-gradient(circle_at_right_top,_#b5d288_0%,_rgba(20,82,65,0.2)_80%)]",
          "text-third-green",
        ]
      : ["bg-light-gray", "text-light-gray"];
  const isFinalStep = (index: number) => index === numberOfSteps - 1;
  const labelName = ["Crie sua conta", "Seus Dados", "Endereço"];

  const possibleSteps = (index: number, isValid: number) => {
    if (index <= isValid - 1) {
      return setCurrentStep(index);
    }
  };

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
                <div
                  className={`w-[35px] h-[2px] mr-3 ${activeColor(index)[0]}`}
                ></div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
