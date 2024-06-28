import { useLazyQuery } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Planet } from "../domain/Planet";
import {
  GET_ALL_PLANETS,
  GetAllPlanetsQueryResult,
} from "../queries/AllPlanetsQuery";

type PlanetsContextData = {
  fetchData: () => Promise<void>;
  planetsDispatch: Dispatch<PlanetsAction>;
  planets: Planet[];
  allClimates: string[];
  allTerrains: string[];
  error: Error | undefined;
  isLoading: boolean;
};

export const PlanetsContext = createContext<PlanetsContextData>({
  fetchData: async () => undefined,
  planetsDispatch: () => undefined,
  planets: [],
  allClimates: [],
  allTerrains: [],
  error: undefined,
  isLoading: true,
});

type PlanetsProviderProps = {
  children: ReactNode;
};

export const enum PlanetsActionType {
  Add = "Add",
  Remove = "Remove",
  Edit = "Edit",
  Set = "Set",
}

type PlanetsAction = {
  type: PlanetsActionType;
  planets?: Planet[];
  newPlanet?: Planet;
  planetToRemoveId?: string;
};

const planetsReducer = (state: Planet[], action: PlanetsAction) => {
  switch (action.type) {
    case PlanetsActionType.Add: {
      if (action.newPlanet) {
        return [...state, action.newPlanet];
      }
      return state;
    }
    case PlanetsActionType.Remove: {
      if (action.planetToRemoveId) {
        return state.filter(({ id }) => id !== action.planetToRemoveId);
      }
      return state;
    }
    case PlanetsActionType.Edit: {
      if (action.newPlanet) {
        const planetIndex = state.findIndex(
          ({ id }) => action.newPlanet!.id === id,
        );

        if (planetIndex !== -1) {
          const newState = [...state];
          state[planetIndex] = action.newPlanet;
          return newState;
        }
      }
      return state;
    }
    case PlanetsActionType.Set: {
      return action.planets ?? [];
    }
    default:
      throw new Error("Planet action type not supported");
  }
};

const PLANETS_DATA_KEY = "planets";

const getLocalPlanetsData = (): Planet[] | undefined => {
  const localPlanetsData = localStorage.getItem(PLANETS_DATA_KEY);
  if (localPlanetsData) {
    return JSON.parse(localPlanetsData);
  }
  return undefined;
};

export const PlanetsProvider = ({ children }: PlanetsProviderProps) => {
  const [planets, planetsDispatch] = useReducer(
    planetsReducer,
    getLocalPlanetsData() ?? [],
  );

  const [fetchAllPlanets, { data, error, loading }] =
    useLazyQuery<GetAllPlanetsQueryResult>(GET_ALL_PLANETS);

  useEffect(() => {
    if (!loading && data?.allPlanets?.planets) {
      planetsDispatch({
        type: PlanetsActionType.Set,
        planets: data.allPlanets.planets,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (planets) {
      localStorage.setItem(PLANETS_DATA_KEY, JSON.stringify(planets));
    }
  }, [planets]);

  const { allClimates, allTerrains } = useMemo(() => {
    if (!planets) {
      return {
        allClimates: [],
        allTerrains: [],
      };
    }

    const uniqueClimates = new Set<string>();
    const uniqueTerrains = new Set<string>();

    for (const planet of planets) {
      for (const climate of planet.climates) {
        uniqueClimates.add(climate);
      }
      for (const terrain of planet.terrains) {
        uniqueTerrains.add(terrain);
      }
    }

    return {
      allClimates: Array.from(uniqueClimates),
      allTerrains: Array.from(uniqueTerrains),
    };
  }, [planets]);

  const fetchData = async (): Promise<void> => {
    const localPlanetsData = getLocalPlanetsData();
    if (localPlanetsData === undefined) {
      fetchAllPlanets();
    }
  };

  return (
    <PlanetsContext.Provider
      value={{
        fetchData,
        planetsDispatch,
        planets,
        allClimates,
        allTerrains,
        error,
        isLoading: loading,
      }}
    >
      {children}
    </PlanetsContext.Provider>
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
