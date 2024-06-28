import { SyntheticEvent, useState } from "react";

import { Button } from "../../components/Button";
import { FormInput } from "../../components/Form/FormInput";
import { FormSelect, SelectOption } from "../../components/Form/FormSelect";
import { Modal } from "../../components/Modal";
import { PopupLayout } from "../../components/PopupLayout";
import { Space } from "../../components/Space";
import { PlanetsActionType, usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";

type NewPlanetModalProps = {
  open: boolean;
  onClose: () => void;
};

const UNKNOWN_OPTION = { label: "unknown", value: "unknown" };

export const NewPlanetModal = ({ open, onClose }: NewPlanetModalProps) => {
  const { allClimates, allTerrains, planetsDispatch } = usePlanets();

  const [selectedClimates, setSelectedClimates] = useState<SelectOption[]>([UNKNOWN_OPTION]);
  const [selectedTerrains, setSelectedTerrains] = useState<SelectOption[]>([UNKNOWN_OPTION]);

  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const diameter = event.currentTarget.diameter.value as string;
    const population = event.currentTarget.population.value as string;

    const newPlanet: Planet = {
      id: crypto.randomUUID(),
      name: (event.currentTarget.name as unknown as HTMLInputElement)
        .value as string,
      diameter: diameter ? parseInt(diameter) : undefined,
      climates: selectedClimates.map(({ value }) => value),
      terrains: selectedTerrains.map(({ value }) => value),
      population: population ? parseInt(population) : undefined,
    };
    planetsDispatch({
      type: PlanetsActionType.Add,
      newPlanet,
    });

    onClose();
  };

  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <form onSubmit={onSubmit}>
        <PopupLayout title="New planet">
          <Space
            $direction="column"
            $justify="space-between"
            $grow={1}
            $gap="large"
          >
            <FormInput label="Name" name="name" required />
            <FormInput label="Diameter (km)" name="diameter" type="number" />
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
              onChange={(selectedOptions) =>
                setSelectedClimates(selectedOptions as SelectOption[])
              }
              defaultValue={UNKNOWN_OPTION}
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
              onChange={(selectedOptions) =>
                setSelectedTerrains(selectedOptions as SelectOption[])
              }
            />
            <FormInput label="Population" name="population" type="number" />
            <Space $justify="flex-end">
              <Button type="button" $secondary onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </Space>
          </Space>
        </PopupLayout>
      </form>
    </Modal>
  );
};
