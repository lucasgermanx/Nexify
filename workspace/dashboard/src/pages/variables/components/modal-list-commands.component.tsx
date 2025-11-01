import { ButtonTransparent } from "@/assets/Style/GlobalStyle";

import { Modal } from "react-bootstrap";
import TableCommandsComponent from "./table-commands.component";

export const ModalListCommands = ({ commands, showModal, handleCloseModal }: any) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      animation={true}
      className="fade"
    >
      <Modal.Body>
        <div>
          <TableCommandsComponent commands={commands}/>
        </div>
        <div
          className="mt-5"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ButtonTransparent onClick={handleCloseModal}>
            Fechar
          </ButtonTransparent>
        </div>
      </Modal.Body>
    </Modal>
  );
};
