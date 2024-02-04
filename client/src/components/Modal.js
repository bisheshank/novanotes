// Modal.js
import React from "react"
import Modal from "react-modal"

const PopupModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Popup Modal">
      <div>
        <button onClick={onClose}>Close</button>
        <div>{content}</div>
      </div>
    </Modal>
  )
}

export default PopupModal
