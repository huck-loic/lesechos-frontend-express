import React from "react";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";

import "./globals.css";

export default function App() {
  return (
    <Routes>
      <Route path="/:user?" element={<UserPage></UserPage>}></Route>
    </Routes>
  );
}
