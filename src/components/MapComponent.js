import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { getDistance } from "ol/sphere";

const MapComponent = ({ drawType, setCoordinates, setDistances }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source,
    });
    map.addLayer(vectorLayer);

    const draw = new Draw({
      source,
      type: drawType,
    });

    map.addInteraction(draw);

    draw.on("drawend", (evt) => {
      const coordinates = evt.feature.getGeometry().getCoordinates();
      setCoordinates(coordinates);
      if (drawType === "LineString") {
        const distances = calculateDistances(coordinates);
        setDistances(distances);
      }
    });

    return () => map.setTarget(null);
  }, [drawType, setCoordinates, setDistances]);

  const calculateDistances = (coordinates) => {
    return coordinates.map((coord, index) => {
      if (index === 0) return 0;
      return getDistance(coord, coordinates[index - 1]);
    });
  };

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapComponent;
