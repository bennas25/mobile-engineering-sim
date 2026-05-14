import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [towers, setTowers] = useState([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [147.067, -38.109], // Sale VIC
      zoom: 9,
    });

    map.current.on("click", (e) => {
      const tower = {
        id: Date.now(),
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        generation: "4G",
        backhaul: "Microwave",
        capacity: 100,
      };

      setTowers((prev) => [...prev, tower]);

      new maplibregl.Marker({ color: "#00ff88" })
        .setLngLat([tower.lng, tower.lat])
        .addTo(map.current);
    });
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "300px",
          background: "#111",
          color: "white",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <h2>Mobile Engineering Sim</h2>

        <p>Towers: {towers.length}</p>

        {towers.map((tower) => (
          <div
            key={tower.id}
            style={{
              border: "1px solid #333",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{tower.generation}</strong>
            <br />
            Backhaul: {tower.backhaul}
            <br />
            Capacity: {tower.capacity}
          </div>
        ))}
      </div>

      <div
        ref={mapContainer}
        style={{
          flex: 1,
        }}
      />
    </div>
  );
}

export default App;