import { toast } from "react-toastify";

import { Modal } from "../../components/Modal";
import { PlanetForm } from "../../components/pages/PlanetForm";
import { PopupLayout } from "../../components/PopupLayout";
import { PlanetsActionType, usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";

type NewPlanetModalProps = {
  open: boolean;
  onClose: () => void;
};

export const NewPlanetModal = ({ open, onClose }: NewPlanetModalProps) => {
  const { planetsDispatch } = usePlanets();

  const onSubmit = (newPlanet: Planet) => {
    planetsDispatch({
      type: PlanetsActionType.Add,
      newPlanet,
    });
    toast.success("Changes saved");

    onClose();
  };

  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <PopupLayout title="New planet">
        <PlanetForm onSubmit={onSubmit} onCancel={onClose} />
      </PopupLayout>
    </Modal>
  );
};
