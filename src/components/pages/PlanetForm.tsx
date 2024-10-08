import { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import { usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";
import { Button } from "../Button";
import { FormInput } from "../Form/FormInput";
import { FormSelect, SelectOption } from "../Form/FormSelect";
import { Space } from "../Layout/Space";

const StyledForm = styled.form`
  max-width: 400px;
`;

const mapDefaultSelectedOptions = (values: string[]): SelectOption[] => {
  return values.map((value) => ({ label: value, value: value }));
};

type PlanetForm = {
  data?: Planet;
  onCancel: () => void;
  onSubmit: (data: Planet) => void;
};

export const PlanetForm = ({ data, onCancel, onSubmit }: PlanetForm) => {
  const { allClimates, allTerrains } = usePlanets();

  const [selectedClimates, setSelectedClimates] = useState<SelectOption[]>(
    () => (data ? mapDefaultSelectedOptions(data.climates) : []),
  );
  const [selectedTerrains, setSelectedTerrains] = useState<SelectOption[]>(
    () => (data ? mapDefaultSelectedOptions(data.terrains) : []),
  );

  const onFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const diameter = event.currentTarget.diameter.value as string;
    const population = event.currentTarget.population.value as string;

    const formData: Planet = {
      id: data?.id ?? crypto.randomUUID(),
      name: (event.currentTarget.name as unknown as HTMLInputElement)
        .value as string,
      diameter: diameter ? parseInt(diameter) : undefined,
      climates: selectedClimates.map(({ value }) => value),
      terrains: selectedTerrains.map(({ value }) => value),
      population: population ? parseInt(population) : undefined,
    };

    onSubmit(formData);
  };

  return (
    <StyledForm onSubmit={onFormSubmit}>
      <Space
        $direction="column"
        $justify="space-between"
        $grow={1}
        $gap="large"
      >
        <FormInput
          label="Name"
          name="name"
          required
          defaultValue={data?.name}
          autoComplete="planet-name"
        />
        <FormInput
          label="Diameter (km)"
          name="diameter"
          type="number"
          defaultValue={data?.diameter}
        />
        <FormSelect
          label="Climates"
          name="climates"
          required
          value={selectedClimates}
          options={allClimates.map((climate) => ({
            label: climate,
            value: climate,
          }))}
          isMulti
          closeMenuOnSelect={false}
          onChange={(selectedOptions) =>
            setSelectedClimates(selectedOptions as SelectOption[])
          }
        />
        <FormSelect
          label="Terrains"
          name="terrains"
          required
          value={selectedTerrains}
          options={allTerrains.map((terrain) => ({
            label: terrain,
            value: terrain,
          }))}
          isMulti
          closeMenuOnSelect={false}
          onChange={(selectedOptions) =>
            setSelectedTerrains(selectedOptions as SelectOption[])
          }
        />
        <FormInput
          label="Population"
          name="population"
          type="number"
          defaultValue={data?.population}
        />
        <Space $justify="flex-end">
          <Button type="button" $secondary onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Space>
      </Space>
    </StyledForm>
  );
};
