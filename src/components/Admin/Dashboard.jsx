import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import profile from "../../assets/rating.png";
import user from "../../assets/user.png";
import settings from "../../assets/ras-settings.png";
import agent from "../../assets/seller.png";
import logout from "../../assets/ras-logout.png";
import addAgent from "../../assets/add-agent.png";
import manageAgent from "../../assets/diagram.png";
import transaction from "../../assets/transaction.png";
import active from "../../assets/active.png";
import pending from "../../assets/planning.png";
import complete from "../../assets/tick.png";
import cancelled from "../../assets/delete2.png";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let newObject = localStorage.getItem("user");
    if (newObject == null) {
      navigate("/admin/login");
    }
  }, []);
  const Links = [
    {
      name: "Transactions",
      icon: complete,
      link: "/admin/transactions/completed",
      bg: "bg-teal-700",
    },
    {
      name: "Manage Agents",
      icon: manageAgent,
      link: "/admin/agents",
      bg: "bg-blue-700",
    },
    {
      name: "Add Agents",
      icon: addAgent,
      link: "/admin/addAgents",
      bg: "bg-gray-700",
    },
    {
      name: "Pending Transactions",
      icon: pending,
      link: "/admin/transactions/pending",
      bg: "bg-indigo-700",
    },
    {
      name: "Active Transactions",
      icon: active,
      link: "/admin/transactions/active",
      bg: "bg-lime-700",
    },
    {
      name: "Cancelled Transactions",
      icon: cancelled,
      link: "/admin/transactions/cancelled",
      bg: "bg-orange-700",
    },
    {
      name: "Settings",
      icon: settings,
      link: "/admin/settings",
      bg: "bg-sky-700",
    },
    {
      name: "Logout",
      icon: logout,
      link: "/admin/logout",
      bg: "bg-red-700",
    },
  ];
  return (
    <Box className="border w-full p-5">
      <Grid container spacing={2}>
        {Links.map((links, index) => {
          return (
            <Grid item xs={12} sm={12} md={3}>
              <Link to={links.link}>
                <Box
                  className={`${links.bg} text-white rounded-md w-full p-5 cursor-pointer`}
                  key={index}
                >
                  <img
                    src={links.icon}
                    alt={links.name}
                    style={{ width: "35px" }}
                  />
                  <Typography
                    sx={{ fontSize: "20px", marginTop: "5%", fontSize: 13 }}
                  >
                    {links.name}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Dashboard;
