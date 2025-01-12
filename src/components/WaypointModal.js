import React from "react";
import Modal from "react-modal";

const WaypointModal = ({ coordinates, distances, onInsertPolygon, onClose }) => {
  return (
    <Modal isOpen onRequestClose={onClose}>
      <h2>Waypoints</h2>
      <table>
        <thead>
          <tr>
            <th>WP</th>
            <th>Coordinates</th>
            <th>Distance (m)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coord, index) => (
            <tr key={index}>
              <td>WP{index.toString().padStart(2, "0")}</td>
              <td>{coord.join(", ")}</td>
              <td>{distances[index].toFixed(2)}</td>
              <td>
                <button onClick={() => onInsertPolygon(index, "before")}>
                  Insert Polygon Before
                </button>
                <button onClick={() => onInsertPolygon(index, "after")}>
                  Insert Polygon After
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default WaypointModal;
