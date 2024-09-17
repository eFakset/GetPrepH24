import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Municipalities from "./pages/Municipalities";
import Articles from "./pages/Articles";
import Customers from "./pages/Customers";
import AddressSearch from "./pages/AddressSearch";
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
              <Route path="search" element={<AddressSearch />} />
              <Route path="articles" element={<Articles />} />
              <Route path="customers" element={<Customers />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
}