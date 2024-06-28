import { SyntheticEvent } from "react";

import { Button } from "../../components/Button";
import { FormInput } from "../../components/Form/FormInput";
import { Modal } from "../../components/Modal";
import { PopupLayout } from "../../components/PopupLayout";
import { Space } from "../../components/Space";

type NewPlanetModalProps = {
  open: boolean;
  onClose: () => void;
};

export const NewPlanetModal = ({ open, onClose }: NewPlanetModalProps) => {
  const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
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
            <FormInput label="Diameter (km)" name="diameter" />
            <FormInput label="Climates" name="climates" required />
            <FormInput label="Terrains" name="terrains" required />
            <FormInput label="Population" name="population" />
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
