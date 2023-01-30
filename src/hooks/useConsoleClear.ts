import { DependencyList, useEffect } from "react";

const useConsoleClear = (timeout: number = 500, deps: DependencyList = []) => {
  useEffect(() => {
    setTimeout(() => {
      console.clear();
    }, timeout);
  }, deps);
};

export { useConsoleClear };
