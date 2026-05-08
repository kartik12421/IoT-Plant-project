import React, { useEffect, useState } from "react";

import { Routes , Route } from "react-router-dom";
import Dash from "./pages/Dash";
import Ai from "./pages/Ai";
export default function App() {




  return (
    <div>
      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/ai" element={<Ai />} />
      </Routes>
    </div>


  );
}