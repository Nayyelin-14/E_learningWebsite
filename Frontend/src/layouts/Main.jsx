import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Badge from "./Badge";
import Navigation from "./Navigation";

const Main = () => {
  const location = useLocation();

  // Check if the current route is an auth-related page
  const isAuthPage = location.pathname.includes("auth");

  return (
    <div>
      {!isAuthPage && <Navigation />}{" "}
      {/* Only show Navigation if not on auth page */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
