import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// @ts-expect-error: Unreachable code error
import DeleteIcon from "../../assets/delete-icon.svg";
// @ts-expect-error: Unreachable code error
import EditIcon from "../../assets/edit-icon.svg";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { PageHeader } from "../../components/PageHeader";
import { Space } from "../../components/Space";
import { usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";
import { GET_PLANET_BY_ID } from "../../queries/PlanetByIdQuery";
import { DeletePlanetModal } from "./DeletePlanetModal";
import { EditPlanetModal } from "./EditPlanetModal";
import { PlanetInfo } from "./PlanetInfo";
import { PlanetResidents } from "./PlanetResidents";

export const PlanetDetails = () => {
  const { planetId } = useParams();

  const { planets } = usePlanets();

  const [planetData, setPlanetData] = useState<Planet>();
  const [planetNotFound, setPlanetNotFound] = useState(false);

  const [deletePlanetOpen, setDeletePlanetOpen] = useState(false);
  const [editPlanetOpen, setEditPlanetOpen] = useState(false);

  const [fetchPlanetResidents, { data, loading, error }] =
    useLazyQuery(GET_PLANET_BY_ID);

  useEffect(() => {
    const foundPlanet = planets.find(({ id }) => id === planetId);
    if (foundPlanet && planetId) {
      fetchPlanetResidents({ variables: { planetId } });
      setPlanetData(foundPlanet);
    } else {
      setPlanetNotFound(true);
    }
  }, [planets, planetId]);

  useEffect(() => {
    if (error) {
      toast.error("Error while retrieving planet residents data");
    }
  }, [error]);

  return (
    <>
      <PageHeader
        title={planetNotFound ? "Planet not found" : planetData?.name ?? ""}
        toolbox={
          planetData &&
          !planetNotFound && (
            <>
              <Button onClick={() => setEditPlanetOpen(true)}>
                <Icon src={EditIcon} />
                Edit
              </Button>
              <Button onClick={() => setDeletePlanetOpen(true)}>
                <Icon src={DeleteIcon} />
                Delete
              </Button>
            </>
          )
        }
      />

      {!planetNotFound && (
        <Space>
          <PlanetInfo data={planetData} />
          <PlanetResidents
            data={data?.planet?.residentConnection?.residents}
            isLoading={loading}
          />
        </Space>
      )}

      {planetData && (
        <>
          <DeletePlanetModal
            data={planetData}
            open={deletePlanetOpen}
            onClose={() => setDeletePlanetOpen(false)}
          />
          <EditPlanetModal
            data={planetData}
            open={editPlanetOpen}
            onClose={() => setEditPlanetOpen(false)}
          />
        </>
      )}
    </>
  );
};
