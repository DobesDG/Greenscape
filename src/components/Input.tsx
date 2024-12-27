import {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLProps,
  Ref
} from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  error?: FieldError;
}

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef(
  function InputFowardRef(props: InputProps, ref: Ref<HTMLInputElement>) {
    const { error, ...InputProps } = props;
    return (
      <div
        className={`flex flex-col text-xs
        }`}
      >
        <input
          className={`pl-5 pr-4 py-2 border text-base bg-primary-brown bg-opacity-30 w-full h-[50px] placeholder-stone-800 ${
            error?.type == "required" ? "border border-red-600" : "border"
          }`}
          {...InputProps}
          ref={ref}
        />
        <div className="flex flex-row justify-between mb-3">
          {error?.type == "required" && (
            <p className="text-[10px] text-red-600">{error.message}</p>
          )}
        </div>
      </div>
    );
  }
);
