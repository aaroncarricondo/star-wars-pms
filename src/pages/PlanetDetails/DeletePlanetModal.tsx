import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { PopupLayout } from "../../components/PopupLayout";
import { Space } from "../../components/Space";
import { PlanetsActionType, usePlanets } from "../../contexts/PlanetsContext";
import { Planet } from "../../domain/Planet";

type DeletePlanetModalProps = {
  open: boolean;
  onClose: () => void;
  data: Planet;
};

export const DeletePlanetModal = ({
  open,
  onClose,
  data,
}: DeletePlanetModalProps) => {
  const { planetsDispatch } = usePlanets();
  const navigate = useNavigate();

  const onConfirm = () => {
    planetsDispatch({
      type: PlanetsActionType.Delete,
      planetToRemoveId: data.id,
    });
    toast.success("Changes saved");
    onClose();

    navigate("/", { replace: true });
  };

  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <PopupLayout title="Delete planet">
        <p>
          Deleting planets can cause problems to jedis such as Obi Wan Kenobi in
          future episodes.
        </p>
        <p>{`Are you sure you want to delete the planet ${data.name}?`}</p>
        <Space $justify="flex-end">
          <Button type="button" $secondary onClick={() => onClose()}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm}>
            Confirm
          </Button>
        </Space>
      </PopupLayout>
    </Modal>
  );
};
