import React, { useState } from "react";
import Modal from "react-modal";

const PolygonModal = ({ onSave, onClose }) => {
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  const handleSave = () => {
    onSave(polygonCoordinates);
  };

  return (
    <Modal isOpen onRequestClose={onClose}>
      <h2>Draw Polygon</h2>
      <p>Draw your polygon on the map.</p>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default PolygonModal;
