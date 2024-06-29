import { toast } from "react-toastify";

import { Modal } from "../../components/Modal/Modal";
import { PlanetForm } from "../../components/pages/PlanetForm";
import { ModalLayout } from "../../components/Modal/ModalLayout";
import { PlanetsActionType, usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";

type EditPlanetModalProps = {
  data: Planet;
  open: boolean;
  onClose: () => void;
};

export const EditPlanetModal = ({
  data,
  open,
  onClose,
}: EditPlanetModalProps) => {
  const { planetsDispatch } = usePlanets();

  const onSubmit = (newPlanet: Planet) => {
    planetsDispatch({
      type: PlanetsActionType.Edit,
      newPlanet,
    });
    toast.success("Changes saved");

    onClose();
  };

  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <ModalLayout title="Edit planet">
        <PlanetForm data={data} onSubmit={onSubmit} onCancel={onClose} />
      </ModalLayout>
    </Modal>
  );
};
