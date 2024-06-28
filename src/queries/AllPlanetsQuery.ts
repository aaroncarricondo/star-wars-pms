import { gql } from "@apollo/client";

import { Planet } from "../domain/Planet";

export const GET_ALL_PLANETS = gql`
  query AllPlanets {
    allPlanets {
      planets {
        id
        name
        diameter
        climates
        terrains
        population
      }
    }
  }
`;

export type GetAllPlanetsQueryResult = {
  allPlanets: {
    planets: Planet[];
  };
};
