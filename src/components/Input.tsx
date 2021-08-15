import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input({ label, className, ...props }, ref) {
  return (
    <label className="block">
      <span className="block">{label}</span>
      <input {...props} ref={ref} className={`border w-full p-2 mt-1 ${className ?? ""}`} />
    </label>
  );
});
