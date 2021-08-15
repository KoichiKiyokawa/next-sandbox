import { useEffect, useState } from "react";

export const useRepository = <T>(promise: Promise<T>) => {
  const [data, setData] = useState<undefined | T | null>(undefined);
  useEffect(() => {
    promise.then(setData);
  }, [promise]);

  return data;
};
