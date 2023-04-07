import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";

import React, { useState } from "react";

import Dashboard from "../../assets/dashboard.png";
import Divider from "@mui/material/Divider";
import user from "../../assets/user.png";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import agent from "../../assets/seller.png";
import settings from "../../assets/ras-settings.png";
import logout from "../../assets/ras-logout.png";
import addAgent from "../../assets/add-agent.png";
import manageAgent from "../../assets/diagram.png";
import transaction from "../../assets/transaction.png";
import active from "../../assets/active.png";
import pending from "../../assets/planning.png";
import complete from "../../assets/tick.png";
import cancelled from "../../assets/delete2.png";

const Sidebar = () => {
  const location = useLocation();
  const [isAgent, setAgent] = useState(false);
  const [isTransaction, setTransaction] = useState(false);

  const handleAgent = () => {
    setAgent(!isAgent);
    setTransaction(false);
  };

  const handleTransactions = () => {
    setTransaction(!isTransaction);
    setAgent(false);
  };

  const Links = [
    {
      name: "Dashboard",
      icon: Dashboard,
      link: "/admin/",
    },
    {
      name: "Transactions",
      icon: transaction,
      link: "/admin/Transactions",
      sublinks: [
        {
          name: "Pending",
          icon: pending,
          link: "/admin/transactions/pending",
        },
        {
          name: "Active",
          icon: active,
          link: "/admin/transactions/active",
        },
        {
          name: "Completed",
          icon: complete,
          link: "/admin/transactions/completed",
        },
        {
          name: "Cancelled",
          icon: cancelled,
          link: "/admin/transactions/cancelled",
        },
      ],
    },
    {
      name: "Agents",
      icon: agent,
      link: "",
      sublinks: [
        {
          name: "Manage Agents",
          icon: manageAgent,
          link: "/admin/agents",
        },
        {
          name: "Add Agents",
          icon: addAgent,
          link: "/admin/addAgents",
        },
      ],
    },

    {
      name: "Settings",
      icon: settings,
      link: "/admin/settings",
    },
    {
      name: "Logout",
      icon: logout,
      link: "/admin/logout",
    },
  ];

  return (
    <Box className="shadow-lg min-h-screen h-screen bg-gray-100 w-3/6 z-10  sm:w-2/12 absolute sm:sticky top-[62px]">
      <List>
        {Links.map((links, index) => (
          <>
            {links.sublinks ? (
              <Box
                key={links.name}
                disablePadding
                className={`relative p-2`}
                onClick={() => {
                  if (links.name === "Agents") {
                    handleAgent();
                  } else if (links.name === "Transactions") {
                    handleTransactions();
                  }
                }}
              >
                <Box className="flex justify-between items-center rounded-md hover:bg-gray-300">
                  <Box
                    className={`${
                      location.pathname === links.link
                        ? "bg-blue-500 text-white flex items-center space-x-4 px-3 py-2  cursor-pointer"
                        : "flex items-center space-x-4 px-3 py-2  cursor-pointer"
                    } w-full`}
                  >
                    <Box>
                      <img
                        src={links.icon}
                        alt="sidebar"
                        style={{ width: "17px" }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontSize: "12px" }}>
                      {links.name}
                    </Typography>
                  </Box>

                  {links.name === "Agents" && (
                    <Box>
                      {isAgent ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  )}

                  {links.name === "Transactions" && (
                    <Box>
                      {isTransaction ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Box>
                  )}
                </Box>
                {links.name === "Agents" && (
                  <Box>
                    {isAgent && (
                      <Box className="pl-5">
                        {links.sublinks &&
                          links.sublinks.map((sub, index) => {
                            return (
                              <Link to={`${sub.link}`}>
                                <Box
                                  className={`${
                                    location.pathname === sub.link
                                      ? "bg-blue-500 text-white flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                      : "flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                  } mt-4 border`}
                                >
                                  <Box>
                                    <img
                                      src={sub.icon}
                                      alt="sidebar"
                                      style={{ width: "17px" }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h5"
                                    sx={{ fontSize: "12px" }}
                                  >
                                    {sub.name}
                                  </Typography>
                                </Box>
                              </Link>
                            );
                          })}
                      </Box>
                    )}
                  </Box>
                )}

                {links.name === "Transactions" && (
                  <Box>
                    {isTransaction && (
                      <Box className="pl-5">
                        {links.sublinks &&
                          links.sublinks.map((sub, index) => {
                            return (
                              <Link to={`${sub.link}`}>
                                <Box
                                  className={`${
                                    location.pathname === sub.link
                                      ? "bg-blue-500 text-white flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                      : "flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                                  } mt-4 border`}
                                >
                                  <Box>
                                    <img
                                      src={sub.icon}
                                      alt="sidebar"
                                      style={{ width: "17px" }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="h5"
                                    sx={{ fontSize: "12px" }}
                                  >
                                    {sub.name}
                                  </Typography>
                                </Box>
                              </Link>
                            );
                          })}
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Link to={links.link}>
                <Box key={links.name} disablePadding className={`relative p-2`}>
                  <Box className="flex justify-between items-center">
                    <Box
                      className={`${
                        location.pathname === links.link
                          ? "bg-blue-500 text-white flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                          : "flex items-center space-x-4 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-300"
                      } w-full`}
                    >
                      <Box>
                        <img
                          src={links.icon}
                          alt="sidebar"
                          style={{ width: "17px" }}
                        />
                      </Box>
                      <Typography variant="h5" sx={{ fontSize: "12px" }}>
                        {links.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Link>
            )}

            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
