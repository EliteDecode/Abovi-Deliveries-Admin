import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import User from "./pages/User";
import SingleAgent from "./pages/SingleAgent";
import AdminLogin from "./pages/AdminLogin";
import AdminLogout from "./pages/AdminLogout";
import PendingTransactions from "./pages/PendingTransactions";
import ActiveTransactions from "./pages/ActiveTransactions";
import CompletedTransactions from "./pages/CompletedTransaction";
import CancelledTransactions from "./pages/CancelledTransactions";
import Agents from "./pages/Agents";
import { Box } from "@mui/material";
import Sidebar from "./components/Admin/Sidebar";
import { useGlobalContext } from "./utils/context";
import NavbarAdmin from "./components/Admin/Navbar";
import AddAgents from "./pages/AddAgents";
import SingleTransaction from "./pages/SingleTransaction";
import Settings from "./pages/Settings";
const App = () => {
  const { menu, pendingTransactions } = useGlobalContext();
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NavbarAdmin pendingTransactions={pendingTransactions} />
                <Box className="flex">
                  {menu && <Sidebar />}
                  <Routes>
                    <Route exact path="/" element={<Admin />} />
                    <Route exact path="/admin" element={<Admin />} />
                    <Route
                      exact
                      path="/admin/settings"
                      element={<Settings />}
                    />
                    <Route exact path="/admin/users" element={<Users />} />
                    <Route
                      exact
                      path="/admin/transactions/:TransactionID"
                      element={<SingleTransaction />}
                    />
                    <Route
                      exact
                      path="/admin/transactions/pending"
                      element={<PendingTransactions />}
                    />
                    <Route
                      exact
                      path="/admin/transactions/active"
                      element={<ActiveTransactions />}
                    />
                    <Route
                      exact
                      path="/admin/transactions/completed"
                      element={<CompletedTransactions />}
                    />
                    <Route
                      exact
                      path="/admin/transactions/cancelled"
                      element={<CancelledTransactions />}
                    />
                    <Route exact path="/admin/agents" element={<Agents />} />
                    <Route
                      exact
                      path="/admin/addAgents"
                      element={<AddAgents />}
                    />
                    <Route
                      exact
                      path="/admin/users/user/:Email"
                      element={<User />}
                    />
                    <Route
                      exact
                      path="/admin/agents/agent/:Email"
                      element={<SingleAgent />}
                    />
                    <Route
                      exact
                      path="/admin/logout"
                      element={<AdminLogout />}
                    />
                  </Routes>
                </Box>
              </>
            }
          />
          <Route exact path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
