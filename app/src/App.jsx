import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "./routes/Client";
import AuthApp from "./routes/Auth";
import DashboardRoutes from "./routes/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routing untuk halaman utama */}
        <Route path="/*" element={<Client />} />

        {/* Routing untuk halaman login & register */}
        <Route path="/auth/*" element={<AuthApp />} />
        
        {/* Routing untuk halaman Dashboard*/}
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
