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
import { GET_ALL_PLANETS } from "../queries/AllPlanetsQuery";

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
  Delete = "Delete",
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
  let stateToReturn: Planet[] = state;

  switch (action.type) {
    case PlanetsActionType.Add: {
      if (action.newPlanet) {
        stateToReturn = [...state, action.newPlanet];
      }
      break;
    }
    case PlanetsActionType.Delete: {
      if (action.planetToRemoveId) {
        stateToReturn = state.filter(
          ({ id }) => id !== action.planetToRemoveId,
        );
      }
      break;
    }
    case PlanetsActionType.Edit: {
      if (action.newPlanet) {
        const planetIndex = state.findIndex(
          ({ id }) => action.newPlanet!.id === id,
        );

        if (planetIndex !== -1) {
          const newState = [...state];
          newState[planetIndex] = action.newPlanet;
          stateToReturn = newState;
        }
      }
      break;
    }
    case PlanetsActionType.Set: {
      stateToReturn = action.planets ?? [];
      break;
    }
    default:
      throw new Error("Planet action type not supported");
  }

  localStorage.setItem(PLANETS_DATA_KEY, JSON.stringify(stateToReturn));

  return stateToReturn;
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
    useLazyQuery(GET_ALL_PLANETS);

  useEffect(() => {
    if (!loading && data?.allPlanets?.planets) {
      planetsDispatch({
        type: PlanetsActionType.Set,
        planets: data.allPlanets.planets,
      });
    }
  }, [loading]);

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
      allClimates: Array.from(uniqueClimates).sort(),
      allTerrains: Array.from(uniqueTerrains).sort(),
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
