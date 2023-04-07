import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.removeItem("user");
    navigate("/admin/login");
  }, []);
  return <div>AdminLogout</div>;
};

export default AdminLogout;
