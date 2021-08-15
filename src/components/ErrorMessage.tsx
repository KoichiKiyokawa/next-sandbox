export const ErrorMessage = ({ message }: { message?: string }) =>
  message ? <span className="text-red-500">{message}</span> : null;
