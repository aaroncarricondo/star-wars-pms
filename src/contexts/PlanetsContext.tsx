import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { APIPlanet } from "../domain/Planet";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SWAPI_BASE_URL = "https://swapi.dev/api";

type PlanetsContextData = {
  fetchData: () => Promise<void>;
  planets: APIPlanet[];
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
  const [planets, setPlanets] = useLocalStorage<APIPlanet[]>("planets");
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (planets === undefined) {
      setIsLoading(true);
      try {
        const planetsAPIData = await fetchPlanets();
        setPlanets(planetsAPIData);
      } catch (error) {
        setError(error as Error);
      }
    }
    setIsLoading(false);
  };

  const fetchPlanets = async (
    previousPlanets: APIPlanet[] = [],
    nextUrl?: string,
  ): Promise<APIPlanet[]> => {
    let response: Response;
    if (nextUrl) {
      response = await fetch(nextUrl);
    } else {
      response = await fetch(`${SWAPI_BASE_URL}/planets`);
    }

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Status: ${response.status}, body: ${responseText}`);
    }

    const data = await response.json();
    const aggregatedPlanets = previousPlanets.concat(data.results);

    if (data.next) {
      return fetchPlanets(aggregatedPlanets, data.next);
    } else {
      return aggregatedPlanets;
    }
  };

  const value = useMemo(() => {
    return {
      fetchData,
      planets: planets ? planets : [],
      error,
      isLoading,
    };
  }, [planets, isLoading]);

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
