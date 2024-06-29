import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// @ts-expect-error: Unreachable code error
import AddIcon from "../../assets/add-icon.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { Table } from "../../components/Table";
import { ColumnDef } from "../../components/Table/types";
import { usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";
import { stringArrayToList } from "../../utils/arrayUtils";
import { NewPlanetModal } from "./NewPlanetModal";

export const PlanetList = () => {
  const navigate = useNavigate();
  const { planets, error, isLoading, fetchData } = usePlanets();

  const [newPlanetOpen, setNewPlanetOpen] = useState(false);

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

  const onRowClick = ({ id }: Planet): void => navigate(id);
  const onNewPlanetModalClose = (): void => setNewPlanetOpen(false);

  return (
    <>
      <PageHeader
        title="Planetary archive"
        toolbox={
          <>
            <Input placeholder="Search" />
            <Button onClick={() => setNewPlanetOpen(true)}>
              <Icon src={AddIcon} />
              New planet
            </Button>
          </>
        }
      />
      <Table
        rowKeyGenerator={({ id }) => id}
        onRowClick={onRowClick}
        data={planets}
        isLoading={isLoading}
        columns={columns}
      />
      <NewPlanetModal open={newPlanetOpen} onClose={onNewPlanetModalClose} />
    </>
  );
};
