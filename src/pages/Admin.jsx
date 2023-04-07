import React from "react";
import Dashboard from "../components/Admin/Dashboard";
import NavbarAdmin from "../components/Admin/Navbar";
import Sidebar from "../components/Admin/Sidebar";
import { Box } from "@mui/material";
import { useGlobalContext } from "../utils/context";
const Admin = () => {
  const { menu } = useGlobalContext();
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Admin;
