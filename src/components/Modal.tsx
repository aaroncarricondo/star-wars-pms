import Popup from "reactjs-popup";
import styled from "styled-components";

export const Modal = styled(Popup)`
  &-overlay {
    background-color: rgba(0, 0, 0, 0.75);
  }
  &-content {
    display: flex;
    flex-direction: column;

    min-width: 400px;
    min-height: 600px;
  }
`;
