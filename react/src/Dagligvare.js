import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Municipalities from "./pages/Municipalities";
import Articles from "./pages/Articles";
import NoPage from "./pages/NoPage";

// "Hoved"-element. Kalles fra index.js
// BrowserRouter osv: Layout.js styrer overordnet struktur inkl. venstre meny
export default function Dagligvare() 
{ 
    return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="municipalities" element={<Municipalities />} />
              <Route path="articles" element={<Articles />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
}