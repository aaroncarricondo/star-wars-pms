import { toast } from "react-toastify";

import { Modal } from "../../components/Modal/Modal";
import { PlanetForm } from "../../components/pages/PlanetForm";
import { ModalLayout } from "../../components/Modal/ModalLayout";
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
      <ModalLayout title="New planet">
        <PlanetForm onSubmit={onSubmit} onCancel={onClose} />
      </ModalLayout>
    </Modal>
  );
};
