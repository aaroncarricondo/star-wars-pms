import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { PopupLayout } from "../../components/PopupLayout";
import { Space } from "../../components/Space";
import { Planet } from "../../domain/Planet";

type PlanetDeleteModalProps = {
  open: boolean;
  onClose: (confirm: boolean) => void;
  data: Planet;
};

export const PlanetDeleteModal = ({
  open,
  onClose,
  data,
}: PlanetDeleteModalProps) => {
  return (
    <Modal open={open} closeOnEscape={false} closeOnDocumentClick={false}>
      <PopupLayout title={`Delete planet ${data.name}`}>
        <p>
          Deleting planets can cause problems to jedis such as Obi Wan Kenobi in
          future episodes.
        </p>
        <p>Are you sure you want to delete?</p>
        <Space $justify="flex-end">
          <Button type="button" $secondary onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={() => onClose(true)}>
            Confirm
          </Button>
        </Space>
      </PopupLayout>
    </Modal>
  );
};
