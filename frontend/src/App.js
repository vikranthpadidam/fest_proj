import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";
// index.js or App.js
import 'bootstrap-icons/font/bootstrap-icons.css';
import Basketball from "./components/games/Badminton";
import Cricket from "./components/games/Cricket";
import Badminton from "./components/games/Badminton";
import Chess from "./components/games/Chess";
import Football from "./components/games/Football";
import Kabbadi from "./components/games/Kabbadi";
import Tabletennis from "./components/games/Tabletennis";
import Carroms from "./components/games/Carroms";
import Vollyball from "./components/games/Vollyball";
import Throwball from "./components/games/Throwball";
import Statistics from "./components/Statistics";
import AdminLogin from "./components/AdminLogin"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin_login" element={<AdminLogin />} />

        <Route path="/badminton" element={<Badminton />} />
        <Route path="/basketball" element={<Basketball />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/football" element={<Football />} />
        <Route path="/kabbadi" element={<Kabbadi />} />
        <Route path="/carroms" element={<Carroms />} />
        <Route path="/tabletennis" element={<Tabletennis />} />
        <Route path="/vollyball" element={<Vollyball />} />
        <Route path="/throwball" element={<Throwball />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;
