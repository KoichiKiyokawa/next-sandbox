import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => <span className="text-red-500">{children}</span>;
