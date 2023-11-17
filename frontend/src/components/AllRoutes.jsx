import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { AllUrl } from "../pages/AllUrl";
import VisitorInfo from "../pages/VisitorInfo";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/all-urls" element={<AllUrl />} />
      <Route path="/visitor-info/:short_id" element={<VisitorInfo />} />
    </Routes>
  );
};

export default AllRoutes;
