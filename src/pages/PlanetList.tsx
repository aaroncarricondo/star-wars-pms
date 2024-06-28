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
import { APIPlanet } from "../domain/Planet";

export const PlanetList = () => {
  const navigate = useNavigate();
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

  const onRowClick = (item: APIPlanet) => {
    const id = item.url.split("/").at(-2);
    if (id) {
      navigate(id);
    }
  };

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
          rowKeyGenerator={(item) => item.url}
          onRowClick={onRowClick}
          data={planets}
          isLoading={isLoading}
          columns={columns}
        />
      </Space>
    </>
  );
};
