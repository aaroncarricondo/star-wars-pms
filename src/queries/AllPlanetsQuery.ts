import { gql, TypedDocumentNode } from "@apollo/client";

import { Planet } from "../domain/Planet";

export const GET_ALL_PLANETS: TypedDocumentNode<GetAllPlanetsQueryResult> = gql`
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

type GetAllPlanetsQueryResult = {
  allPlanets: {
    planets: Planet[];
  };
};
