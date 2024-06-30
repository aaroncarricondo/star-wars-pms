import styled from "styled-components";

import { Space } from "../../components/Layout/Space";
import { Table } from "../../components/Table";
import { ColumnDef } from "../../components/Table/types";
import { H2 } from "../../components/Titles";
import { Resident } from "../../domain/Resident";
import { stringSorter } from "../../utils/sortUtils";

const PlanetResidentsSpace = styled(Space)`
  width: 100%;
`;

type PlanetResidentsProps = {
  data: Resident[] | undefined;
  isLoading: boolean;
};

export const PlanetResidents = ({ data, isLoading }: PlanetResidentsProps) => {
  const columns: ColumnDef<Resident>[] = [
    {
      key: "name",
      header: "Name",
      dataIndex: "name",
      sorter: (residentA, residentB) =>
        stringSorter(residentA.name, residentB.name),
    },
    {
      key: "birth",
      header: "Birth year",
      dataIndex: "birthYear",
      sorter: (residentA, residentB) =>
        stringSorter(residentA.birthYear, residentB.birthYear),
    },
    {
      key: "gender",
      header: "Gender",
      dataIndex: "gender",
      sorter: (residentA, residentB) =>
        stringSorter(residentA.gender, residentB.gender),
    },
  ];

  return (
    <PlanetResidentsSpace $direction="column">
      <H2>Residents</H2>
      <Table
        rowKeyGenerator={({ id }) => id}
        data={data ?? []}
        isLoading={isLoading}
        columns={columns}
      />
    </PlanetResidentsSpace>
  );
};
