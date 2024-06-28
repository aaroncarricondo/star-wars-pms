import { useLazyQuery } from "@apollo/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { Planet } from "../domain/Planet";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  GET_ALL_PLANETS,
  GetAllPlanetsQueryResult,
} from "../queries/AllPlanetsQuery";

type PlanetsContextData = {
  fetchData: () => Promise<void>;
  planets: Planet[];
  error: Error | undefined;
  isLoading: boolean;
};

export const PlanetsContext = createContext<PlanetsContextData>({
  fetchData: async () => undefined,
  planets: [],
  error: undefined,
  isLoading: true,
});

type PlanetsProviderProps = {
  children: ReactNode;
};

export const PlanetsProvider = ({ children }: PlanetsProviderProps) => {
  const [planets, setPlanets] = useLocalStorage<Planet[]>("planets");

  const [fetchAllPlanets, { data, error, loading }] =
    useLazyQuery<GetAllPlanetsQueryResult>(GET_ALL_PLANETS);

  const fetchData = async () => {
    if (planets === undefined) {
      fetchAllPlanets();
    }
  };

  useEffect(() => {
    if (!loading && data?.allPlanets?.planets) {
      setPlanets(data.allPlanets.planets);
    }
  }, [loading]);

  const value = useMemo(() => {
    return {
      fetchData,
      planets: planets ? planets : [],
      error,
      isLoading: loading,
    };
  }, [planets, loading]);

  return (
    <PlanetsContext.Provider value={value}>{children}</PlanetsContext.Provider>
  );
};

export const usePlanets = (): PlanetsContextData => {
  const context = useContext(PlanetsContext);
  if (context === undefined) {
    throw new Error(
      "usePlanets must be used within the corresponding PlanetsProvider",
    );
  }
  return context;
};
