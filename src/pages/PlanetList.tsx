import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { PageHeader } from "../components/PageHeader";
import { Space } from "../components/Space";
import { Table } from "../components/Table";
import { ColumnDef } from "../components/Table/types";
import { usePlanets } from "../contexts/PlanetsContext";
import { Planet } from "../domain/Planet";
import { stringArrayToList } from "../utils/arrayUtils";

export const PlanetList = () => {
  const navigate = useNavigate();
  const { planets, error, isLoading, fetchData } = usePlanets();

  useEffect(() => void fetchData(), []);

  useEffect(() => {
    if (isLoading === false && error) {
      toast.error("Error while retrieving planets data");
    }
  }, [error, isLoading]);

  const columns: ColumnDef<Planet>[] = [
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
      header: "Climates",
      render: ({ climates }) => stringArrayToList(climates),
    },
    {
      key: "terrain",
      header: "Terrains",
      render: ({ terrains }) => stringArrayToList(terrains),
    },
    {
      key: "population",
      header: "Population",
      dataIndex: "population",
    },
  ];

  const onRowClick = ({ id }: Planet) => navigate(id);

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
      <Space $justify="center">
        <Table
          rowKeyGenerator={({ id }) => id}
          onRowClick={onRowClick}
          data={planets}
          isLoading={isLoading}
          columns={columns}
        />
      </Space>
    </>
  );
};
