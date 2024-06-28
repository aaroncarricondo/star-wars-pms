import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../../components/Button";
import { PageHeader } from "../../components/PageHeader";
import { Space } from "../../components/Space";
import { H2 } from "../../components/Titles";
import { usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";
import {
  GET_PLANET_BY_ID,
  GetPlanetByIdQueryResult,
} from "../../queries/PlanetByIdQuery";
import { PlanetInfo } from "./PlanetInfo";

const PlanetNotFoundContainer = styled(Space)`
  height: ${({ theme }) =>
    `calc(100vh - ${theme.navbarHeight} - ${theme.spacing.normal} * 2)`};
`;

export const PlanetDetails = () => {
  const { planetId } = useParams();
  const { planets } = usePlanets();

  const [planetData, setPlanetData] = useState<Planet>();
  const [planetNotFound, setPlanetNotFound] = useState(false);

  const [fetchPlanetResidents, { data, loading, error }] =
    useLazyQuery<GetPlanetByIdQueryResult>(GET_PLANET_BY_ID);

  useEffect(() => {
    const planet = planets.find(({ id }) => id === planetId);
    if (planet) {
      fetchPlanetResidents();
      setPlanetData(planet);
    } else {
      setPlanetNotFound(true);
    }
  }, [planets, planetId]);

  return (
    <>
      <PageHeader
        title={planetData?.name ?? ""}
        toolbox={
          planetData &&
          !planetNotFound && (
            <>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </>
          )
        }
      />
      {!planetData && planetNotFound ? (
        <PlanetNotFoundContainer $justify="center" $align="center">
          <H2>Planet not found</H2>
        </PlanetNotFoundContainer>
      ) : (
        <Space>
          <PlanetInfo data={planetData} />
        </Space>
      )}
    </>
  );
};
