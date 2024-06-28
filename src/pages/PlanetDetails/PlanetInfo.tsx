import { Space } from "../../components/Space";
import { Spinner } from "../../components/Spinner";
import { H2, H3 } from "../../components/Titles";
import { Planet } from "../../domain/Planet";
import { stringArrayToList } from "../../utils/arrayUtils";

type PlanetInfoProps = {
  data: Planet | undefined;
};

export const PlanetInfo = ({ data }: PlanetInfoProps) => {
  return (
    <Space $direction="column">
      <H2>Planet details</H2>
      {data ? (
        <>
          <PlanetDetailsInfoProperty
            title="Diameter (km)"
            content={data.diameter}
          />
          <PlanetDetailsInfoProperty
            title="Climates"
            content={stringArrayToList(data.climates)}
          />
          <PlanetDetailsInfoProperty
            title="Terrains"
            content={stringArrayToList(data.terrains)}
          />
          <PlanetDetailsInfoProperty
            title="Population"
            content={data.population}
          />
        </>
      ) : (
        <Spinner />
      )}
    </Space>
  );
};

type PlanetDetailsInfoProperty = {
  title: string;
  content: string | number | undefined;
};

const PlanetDetailsInfoProperty = ({
  title,
  content,
}: PlanetDetailsInfoProperty) => {
  return (
    <Space $direction="column" $gap="small">
      <H3>{title}</H3>
      <span>{content ?? "-"}</span>
    </Space>
  );
};
