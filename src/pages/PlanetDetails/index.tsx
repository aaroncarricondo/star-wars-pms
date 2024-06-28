import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../../components/Button";
import { PageHeader } from "../../components/PageHeader";
import { Space } from "../../components/Space";
import { PlanetsActionType, usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";
import { GET_PLANET_BY_ID } from "../../queries/PlanetByIdQuery";
import { PlanetInfo } from "./PlanetInfo";
import { PlanetResidents } from "./PlanetResidents";

export const PlanetDetails = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();

  const { planets, planetsDispatch } = usePlanets();

  const [planetData, setPlanetData] = useState<Planet>();
  const [planetNotFound, setPlanetNotFound] = useState(false);

  const [fetchPlanetResidents, { data, loading, error }] =
    useLazyQuery(GET_PLANET_BY_ID);

  useEffect(() => {
    const planet = planets.find(({ id }) => id === planetId);
    if (planetId && planet) {
      fetchPlanetResidents({ variables: { planetId } });
      setPlanetData(planet);
    } else {
      setPlanetNotFound(true);
    }
  }, [planets, planetId]);

  useEffect(() => {
    if (error) {
      toast.error("Error while retrieving planet residents data");
    }
  }, [error]);

  const onDelete = () => {
    // TODO: Confirmation modal
    planetsDispatch({
      type: PlanetsActionType.Delete,
      planetToRemoveId: planetId,
    });

    navigate("/");
  };

  return (
    <>
      <PageHeader
        title={planetNotFound ? "Planet not found" : planetData?.name ?? ""}
        toolbox={
          planetData &&
          !planetNotFound && (
            <>
              <Button>Edit</Button>
              <Button onClick={onDelete}>Delete</Button>
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
    </>
  );
};
