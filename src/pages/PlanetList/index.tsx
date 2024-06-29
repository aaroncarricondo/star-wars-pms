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
import {
  stringArrayIncludesCaseInsensitive,
  stringArrayToList,
} from "../../utils/arrayUtils";
import { stringSorter } from "../../utils/sortUtils";
import { NewPlanetModal } from "./NewPlanetModal";

export const PlanetList = () => {
  const navigate = useNavigate();
  const { planets, error, isLoading, fetchData } = usePlanets();

  const [newPlanetOpen, setNewPlanetOpen] = useState(false);
  const [search, setSearch] = useState("");

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
      sorter: (planetA, planetB) => stringSorter(planetA.name, planetB.name),
    },
    {
      key: "diameter",
      header: "Diameter (km)",
      dataIndex: "diameter",
      sorter: (planetA, planetB) =>
        (planetA.diameter ?? -1) - (planetB.diameter ?? -1),
    },
    {
      key: "climate",
      header: "Climates",
      render: ({ climates }) => stringArrayToList(climates),
      sorter: (planetA, planetB) =>
        stringSorter(
          [...planetA.climates].sort()[0],
          [...planetB.climates].sort()[0],
        ),
    },
    {
      key: "terrain",
      header: "Terrains",
      render: ({ terrains }) => stringArrayToList(terrains),
      sorter: (planetA, planetB) =>
        stringSorter(
          [...planetA.climates].sort()[0],
          [...planetB.climates].sort()[0],
        ),
    },
    {
      key: "population",
      header: "Population",
      dataIndex: "population",
      sorter: (planetA, planetB) =>
        (planetA.population ?? -1) - (planetB.population ?? -1),
    },
  ];

  const onRowClick = ({ id }: Planet): void => navigate(id);
  const onNewPlanetModalClose = (): void => setNewPlanetOpen(false);

  const getFilteredPlanets = () => {
    if (!search) {
      return planets;
    }

    const loweredSearch = search.toLowerCase();
    return planets.filter(({ name, climates, terrains }) => {
      if (name.toLowerCase().includes(loweredSearch)) {
        return true;
      }

      if (stringArrayIncludesCaseInsensitive(climates, loweredSearch)) {
        return true;
      }

      if (stringArrayIncludesCaseInsensitive(terrains, loweredSearch)) {
        return true;
      }

      return false;
    });
  };

  return (
    <>
      <PageHeader
        title="Planetary archive"
        toolbox={
          <>
            <Input
              name="search"
              placeholder="Search"
              onChange={(event) => setSearch(event.target.value)}
            />
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
        data={getFilteredPlanets()}
        isLoading={isLoading}
        columns={columns}
      />
      <NewPlanetModal open={newPlanetOpen} onClose={onNewPlanetModalClose} />
    </>
  );
};
