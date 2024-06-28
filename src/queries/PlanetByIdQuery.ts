import { gql, TypedDocumentNode } from "@apollo/client";

import { Resident } from "../domain/Resident";

type GetPlanetByIdQueryResult = {
  planet: {
    residentConnection: {
      residents: Resident[];
    };
  };
};

type GetPlanetByIdVars = {
  planetId: string;
};

export const GET_PLANET_BY_ID: TypedDocumentNode<
  GetPlanetByIdQueryResult,
  GetPlanetByIdVars
> = gql`
  query PlanetById($planetId: ID) {
    planet(id: $planetId) {
      residentConnection {
        residents {
          name
          birthYear
          gender
          id
        }
      }
    }
  }
`;
