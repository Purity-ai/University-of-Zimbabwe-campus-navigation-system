import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./components/Map";
import NavigationPage from "./components/NavigationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/navigation" element={<NavigationPage />} />
      </Routes>
    </BrowserRouter>
  );
}