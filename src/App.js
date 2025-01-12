import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import WaypointModal from "./components/WaypointModal";
import PolygonModal from "./components/PolygonModal";
import "./styles.css";

const App = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [distances, setDistances] = useState([]);
  const [isWaypointModalOpen, setIsWaypointModalOpen] = useState(false);
  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [drawType, setDrawType] = useState("LineString"); // Default draw type

  const handleDrawButtonClick = () => {
    setIsWaypointModalOpen(true);
  };

  const handleInsertPolygon = (index, position) => {
    setIsPolygonModalOpen(true);
  };

  const handlePolygonSave = (newCoordinates) => {
    setPolygonCoordinates(newCoordinates);
    setIsPolygonModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleDrawButtonClick}>Draw on the Map</button>
      <MapComponent
        drawType={drawType}
        setCoordinates={setCoordinates}
        setDistances={setDistances}
      />
      {isWaypointModalOpen && (
        <WaypointModal
          coordinates={coordinates}
          distances={distances}
          onInsertPolygon={handleInsertPolygon}
          onClose={() => setIsWaypointModalOpen(false)}
        />
      )}
      {isPolygonModalOpen && (
        <PolygonModal
          onSave={handlePolygonSave}
          onClose={() => setIsPolygonModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
