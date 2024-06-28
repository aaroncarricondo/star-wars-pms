import { Modal } from "../../components/Modal";
import { PlanetForm } from "../../components/pages/PlanetForm";
import { PopupLayout } from "../../components/PopupLayout";
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

    onClose();
  };

  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <PopupLayout title="Edit planet">
        <PlanetForm data={data} onSubmit={onSubmit} onCancel={onClose} />
      </PopupLayout>
    </Modal>
  );
};
