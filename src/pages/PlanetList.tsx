import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageHeader } from "../components/PageHeader";
import { Space } from "../components/Space";
import { Spinner } from "../components/Spinner";
import { usePlanets } from "../contexts/PlanetsContext";

const SpinnerContainer = styled(Space)`
  height: 60vh;
`;

export const PlanetList = () => {
  const { planets, error, isLoading, fetchData } = usePlanets();

  useEffect(() => void fetchData());

  useEffect(() => {
    if (isLoading === false && error) {
      toast.error("Error while retrieving planets data");
    }
  }, [error, isLoading]);

  return (
    <>
      <PageHeader
        title={"Planetary archive"}
        toolbox={
          <Space>
            <Input placeholder="Search" />
            <Button>New planet</Button>
          </Space>
        }
      />
      {isLoading ? (
        <SpinnerContainer $justify="center" $align="center">
          <Spinner />
        </SpinnerContainer>
      ) : (
        <ul>
          {planets.map(({ name, url }) => (
            <li key={url}>{name}</li>
          ))}
        </ul>
      )}
    </>
  );
};
