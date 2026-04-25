

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";

export default function Map() {
    const universityOfZimbabwe = [-17.7816, 31.0544];

    return (
        <div className="map-container">


            <div className="header">
                <img src={logo} alt="University of Zimbabwe Logo" />
                <h2>University of Zimbabwe Campus Navigator</h2>
            </div>
            <div className="search-container">

                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search for a building e.g Beit Hall"
                />
                <button className="search-button">Search</button>
            </div>

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
                        University of Zimbabwe <br />
                        Main Campus
                    </Popup>
                </Marker>

            </MapContainer>
        </div >
    );
}