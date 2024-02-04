// Modal.tsx
import React from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const PopupModal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Popup Modal">
      <div>
        <button onClick={onClose}>Close</button>
        <div>{content}</div>
      </div>
    </Modal>
  );
};

export default PopupModal;
