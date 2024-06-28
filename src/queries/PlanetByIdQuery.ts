import { gql } from "@apollo/client";

import { Resident } from "../domain/Resident";

export const GET_PLANET_BY_ID = gql`
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

export type GetPlanetByIdQueryResult = {
  planet: {
    residentConnection: {
      residents: Resident[];
    };
  };
};
