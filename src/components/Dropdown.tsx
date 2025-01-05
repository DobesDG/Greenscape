import { HTMLProps, useEffect, useRef, useState, forwardRef } from "react";
import { FieldError, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { UserSchema } from "../lib/UserSchema";

interface DropdownProps extends HTMLProps<HTMLInputElement> {
  type: string;
  error?: FieldError;
  setValue: UseFormSetValue<UserSchema>;
  getValue: UseFormGetValues<UserSchema>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const States = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espirito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MS: "Mato Grosso do Sul",
  MT: "Mato Grosso",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

const Genders = ["Masculino", "Feminino", "Outro"];

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ type, error, setValue, getValue }, ref) => {
    const [openDrop, setOpenDrop] = useState(false);

    const isGender = type === "gender";

    const Arr = isGender ? Genders : Object.values(States);

    const placeholder = isGender
      ? getValue("personalData.gender") || "Gênero"
      : getValue("address.state") || "Estado";

    const valueField = isGender ? "personalData.gender" : "address.state";

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpenDrop(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="relative w-full" ref={ref}>
        <div ref={dropdownRef}>
          <button
            className={`w-full h-[50px] flex items-center justify-between pl-5 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 focus:border-2 focus:border-black focus:rounded-[4px] ${
              error ? "border-red-600" : "border"
            }`}
            type="button"
            onClick={() => setOpenDrop((prev) => !prev)}
          >
            <div className="text-stone-800 relative">{placeholder}</div>
          </button>
          {openDrop && (
            <div className="absolute mt-1 w-full py-2 border rounded-md bg-white shadow-md z-10 overflow-y-auto max-h-[227px]">
              {Arr.map((option) => (
                <div
                  className="hover:cursor-pointer py-2 px-4 hover:bg-secondary-green hover:text-white"
                  key={option}
                  onClick={() => {
                    setValue(valueField, `${option}`);
                    setOpenDrop(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          {error && (
            <p className="text-[10px] text-red-600 mt-1">{error.message}</p>
          )}
        </div>
      </div>
    );
  }
);
