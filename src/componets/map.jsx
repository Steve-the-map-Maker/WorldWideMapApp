import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";
import { useCities } from "../Context/CitiesContext";
import Button from "./Button";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../Hooks/useGeoLocation";
import { useURLPosition } from "../Hooks/useURLPosition";

function map() {
  const { cities } = useCities();
  const [mapPosition, setMapPostition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocaitonPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useURLPosition();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPostition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocaitonPosition)
        setMapPostition([geoLocaitonPosition.lat, geoLocaitonPosition.lng]);
    },
    [geoLocaitonPosition]
  );

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  // console.log(`map position ${mapPosition}`);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading" : "Use your position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji ? flagemojiToPNG(city.emoji) : ""}</span>{" "}
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  // console.log(position);
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e);

      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default map;
