import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function NavigationPage() {
    const location = useLocation();
    const navigate = useNavigate();
     const [selectedRoom, setSelectedRoom] = useState(null);

    // GET DATA PASSED FROM Map.jsx via navigate("/navigation", { state: {...} })
    const { start, destination } = location.state || {};

    // FALLBACK — if someone visits /navigation directly with no state
    if (!start || !destination) {
        return (
            <div className="map-container">
                <div className="header">
                    <img src={logo} alt="University of Zimbabwe Logo" />
                    <h2>University of Zimbabwe Campus Navigator</h2>
                </div>
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <p>No destination selected.</p>
                    <button
                        className="search-button"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Map
                    </button>
                </div>
            </div>
        );
    }

    const route = [start, destination.position];
    const rooms = destination.rooms || [];

   

    const handleRoomClick = (room) => {
        // Toggle off if clicking the same room again
        setSelectedRoom(selectedRoom?.name === room.name ? null : room);
    };

    return (
        <div className="map-container">

            {/* HEADER */}
            <div className="header">
                <img src={logo} alt="University of Zimbabwe Logo" />
                <h2>University of Zimbabwe Campus Navigator</h2>
            </div>

            {/* CONTENT */}
            <div className="content-layout">

                {/* LEFT SIDE — Rooms Panel */}
                <div className="popular-venues">

                    <button
                        className="back-button"
                        onClick={() => navigate("/")}
                    >
                        ← Back
                    </button>

                    <h2 style={{ marginTop: "1rem" }}>
                        {destination.name}
                    </h2>
                    <p className="rooms-subtitle">Rooms in this building</p>

                    {rooms.map((room, index) => (
                        <div key={index}>

                            {/* ROOM BUTTON */}
                            <button
                                className="venue-button"
                                onClick={() => handleRoomClick(room)}
                            >
                                {room.name}
                            </button>

                            {/* DESCRIPTION — slides open below the clicked room */}
                            {selectedRoom?.name === room.name && (
                                <div className="room-description">
                                    📍 {room.description}
                                </div>
                            )}

                        </div>
                    ))}

                </div>

                {/* RIGHT SIDE — Map with Route */}
                <div className="map-section">

                    {/* DESTINATION LABEL BANNER */}
                    <div className="destination-banner">
                        Navigating to: <strong>{destination.name}</strong>
                    </div>

                    <MapContainer
                        center={destination.position}
                        zoom={17}
                        style={{ height: "100vh", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />

                        {/* START MARKER */}
                        <Marker position={start}>
                            <Popup>📍 Your Starting Point</Popup>
                        </Marker>

                        {/* DESTINATION MARKER */}
                        <Marker position={destination.position}>
                            <Popup>🏛️ {destination.name}</Popup>
                        </Marker>

                        {/* ROUTE LINE */}
                        <Polyline
                            positions={route}
                            pathOptions={{ color: "#1a56db", weight: 6, opacity: 0.8 }}
                        />

                    </MapContainer>

                </div>

            </div>

        </div>
    );
}