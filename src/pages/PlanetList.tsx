import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageHeader } from "../components/PageHeader";
import { Space } from "../components/Space";
import { Spinner } from "../components/Spinner";
import { Table } from "../components/Table";
import { ColumnDef } from "../components/Table/types";
import { usePlanets } from "../contexts/PlanetsContext";
import { APIPlanet } from "../domain/Planet";

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

  const columns: ColumnDef<APIPlanet>[] = [
    {
      key: "name",
      header: "Name",
      dataIndex: "name",
    },
    {
      key: "diameter",
      header: "Diameter (km)",
      dataIndex: "diameter",
    },
    {
      key: "climate",
      header: "Climate",
      dataIndex: "climate",
    },
    {
      key: "terrain",
      header: "Terrain",
      dataIndex: "terrain",
    },
    {
      key: "population",
      header: "Population",
      dataIndex: "population",
    },
  ];

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
        <Space $justify="center">
          <Table
            rowKeyGenerator={(item) => item.url}
            data={planets}
            isLoading={isLoading}
            columns={columns}
          />
        </Space>
      )}
    </>
  );
};
