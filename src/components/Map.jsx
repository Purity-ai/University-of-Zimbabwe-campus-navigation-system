import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { useState } from "react";
import PopularVenues from "./PopularVenues";
import venues from "./venues";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Component to handle map clicks for selecting a starting point
function MapClickHandler({ onMapClick, isSelectingStart }) {
    useMapEvents({
        click(e) {
            if (isSelectingStart) {
                onMapClick([e.latlng.lat, e.latlng.lng]);
            }
        }
    });
    return null;
}

export default function Map() {
    const universityOfZimbabwe = [-17.7816, 31.0544];
    const [showPopup, setShowPopup] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [isSelectingStart, setIsSelectingStart] = useState(false);
    const navigate = useNavigate();

    const handleVenueClick = (venueName) => {
        const destination = venues.find((v) => v.name === venueName);
        if (!destination) return;
        setSelectedVenue(destination);
        setShowPopup(true); // Just show the modal — nothing else
    };

    const handleUseCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = [
                position.coords.latitude,
                position.coords.longitude
            ];
            setShowPopup(false);
            // Navigate to directions page, passing start + destination via state
            navigate("/navigation", {
                state: {
                    start: currentLocation,
                    destination: selectedVenue
                }
            });
        });
    };

    const handleSelectStartingPoint = () => {
        setShowPopup(false);
        setIsSelectingStart(true); // Tell the map to listen for a click
    };

    const handleMapClick = (coords) => {
        setIsSelectingStart(false);
        navigate("/navigation", {
            state: {
                start: coords,
                destination: selectedVenue
            }
        });
    };

    return (
        <div className="map-container">

            {/* HEADER */}
            <div className="header">
                <img src={logo} alt="University of Zimbabwe Logo" />
                <h2>University of Zimbabwe Campus Navigator</h2>
            </div>

            {/* BELOW HEADER */}
            <div className="content-layout">

                {/* LEFT SIDEBAR */}
                <PopularVenues onVenueClick={handleVenueClick} />

                {/* RIGHT MAP AREA */}
                <div className="map-section">

                    {isSelectingStart && (
                        <div className="selecting-hint">
                            📍 Click anywhere on the map to set your starting point
                        </div>
                    )}

                    <div className="search-container">
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search for a building e.g Beit Hall"
                        />
                        <button className="search-button">Search</button>
                    </div>

                    {/* CUSTOM MODAL — no window.confirm, no window.alert */}
                    {showPopup && (
                        <div className="custom-popup">
                            <div className="popup-box">
                                <h3>Select Navigation Option</h3>
                                <button onClick={handleUseCurrentLocation}>
                                    Use Current Location
                                </button>
                                <button onClick={handleSelectStartingPoint}>
                                    Select Starting Point
                                </button>
                            </div>
                        </div>
                    )}

                    <MapContainer
                        center={universityOfZimbabwe}
                        zoom={16}
                        style={{ height: "100vh", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
                        <Marker position={universityOfZimbabwe}>
                            <Popup>
                                University of Zimbabwe <br /> Main Campus
                            </Popup>
                        </Marker>

                        {/* Listens for map clicks only when user chose "Select Starting Point" */}
                        <MapClickHandler
                            onMapClick={handleMapClick}
                            isSelectingStart={isSelectingStart}
                        />
                    </MapContainer>

                </div>
            </div>
        </div>
    );
}