import { FormHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from "react";

type Props = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

const Form = ({ children, className, ...rest }: Props, ref: ForwardedRef<HTMLFormElement>) => (
  <form {...rest} ref={ref} className={`space-y-4 ${className ?? ""}`}>
    {children}
  </form>
);

export default forwardRef<HTMLFormElement, Props>(Form);
