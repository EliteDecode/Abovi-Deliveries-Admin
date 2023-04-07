import { Box, Button, Chip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useGlobalContext } from "../utils/context";
import { Edit, HowToReg } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { url } from "../utils";
import { toast } from "react-toastify";
import axios from "axios";
const Agents = () => {
  const { loading, agentData, getAgents } = useGlobalContext();
  const location = useLocation();
  const [isLoadingSuspend, setSuspendLoading] = useState(false);

  useEffect(() => {
    getAgents();
  }, [location.pathname]);

  const handleSuspend = (value) => {
    setSuspendLoading(true);
    axios
      .put(`${process.env.REACT_APP_ABOVI_URL}/agents/suspendAgent`, {
        Email: value,
      })
      .then((data) => {
        setSuspendLoading(false);
        console.log(data);
        toast.info("You have suspended this agent ", {
          position: "bottom-right",
          autoClose: 1000,
          onClose: () => {
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        setSuspendLoading(false);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        return toast.error(message);
      });
  };

  const handleActive = (value) => {
    setSuspendLoading(true);
    axios
      .put(`${process.env.REACT_APP_ABOVI_URL}/agents/activateAgent`, {
        Email: value,
      })
      .then((data) => {
        setSuspendLoading(false);
        console.log(data);
        toast.info("You have Activated this agent ", {
          position: "bottom-right",
          autoClose: 1000,
          onClose: () => {
            window.location.reload();
          },
        });
      })
      .catch((error) => {
        setSuspendLoading(false);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        return toast.error(message);
      });
  };
  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "Firstname",
      headerName: "First name",
      width: 100,
    },
    {
      field: "Lastname",
      headerName: "Last name",
      width: 100,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "Email",
      headerName: "Email",

      width: 180,
    },
    {
      field: "Phone",
      headerName: "Phone Number",
      width: 180,
    },

    {
      field: "Edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Box className="flex items-center space-x-2">
              {" "}
              <Link to={`/admin/agents/agent/${params.row.Email}`}>
                <Button
                  variant="contained"
                  sx={{ fontSize: 10 }}
                  disableElevation
                  size="small"
                  endIcon={<Edit sx={{ fontSize: 10 }} />}
                >
                  Edit
                </Button>
              </Link>
            </Box>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Box className="flex items-center space-x-2">
              {isLoadingSuspend ? (
                <Button
                  variant="contained"
                  sx={{ fontSize: 10 }}
                  size="small"
                  disableElevation
                  color="warning"
                  endIcon={<PendingActionsIcon sx={{ fontSize: 10 }} />}
                >
                  <ClipLoader
                    color="white"
                    loading="loading"
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </Button>
              ) : (
                <>
                  {params.row.Verified ? (
                    <Button
                      onClick={() => handleSuspend(params.row.Email)}
                      variant="contained"
                      sx={{ fontSize: 10 }}
                      size="small"
                      disableElevation
                      color="success"
                      endIcon={<HowToReg sx={{ fontSize: 10 }} />}
                    >
                      Active
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleActive(params.row.Email)}
                      variant="contained"
                      sx={{ fontSize: 10 }}
                      size="small"
                      disableElevation
                      color="warning"
                      endIcon={<PendingActionsIcon sx={{ fontSize: 10 }} />}
                    >
                      Suspended
                    </Button>
                  )}
                </>
              )}
            </Box>
          </>
        );
      },
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     LastName: "Snow",
  //     FirstName: "Jon",
  //     Email: "snowjow@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 2,
  //     LastName: "Lannister",
  //     FirstName: "Cersei",
  //     Email: "lanister@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 3,
  //     LastName: "Lannister",
  //     FirstName: "Jaime",
  //     Email: "jaime@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 4,
  //     LastName: "Stark",
  //     FirstName: "Arya",
  //     Email: "Starck@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 5,
  //     LastName: "Targaryen",
  //     FirstName: "Daenerys",
  //     Email: "Starck@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 6,
  //     LastName: "Melisandre",
  //     FirstName: null,
  //     Email: "snowjow@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 7,
  //     LastName: "Clifford",
  //     FirstName: "Ferrara",
  //     Email: "snowjow@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 8,
  //     LastName: "Frances",
  //     FirstName: "Rossini",
  //     Email: "snowjow@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  //   {
  //     id: 9,
  //     LastName: "Roxie",
  //     FirstName: "Harvey",
  //     Email: "snowjow@gmail.com",
  //     Address: "125 Ekehuan road",
  //     University: "Uniben",
  //   },
  // ];

  return (
    <Box className="boder p-4 w-full">
      <Box className="p-5 bg-gray-100 w-full">
        <Typography
          variant="h5"
          className="text-blue-400"
          sx={{ fontSize: "13px", fontWeight: "bolder" }}
        >
          PAGE
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>
          Registered Agents: {agentData?.length || 0}
        </Typography>
      </Box>

      <Box sx={{ height: "80vh", width: "100%" }} className="z-0">
        {loading ? (
          <Box className="mt-4 flex items-center justify-center h-[67vh]">
            <ClipLoader
              color="blue"
              loading="loading"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        ) : (
          <DataGrid
            rows={agentData}
            columns={columns}
            pageSize={13}
            rowsPerPageOptions={[13]}
            checkboxSelection
          />
        )}
      </Box>
    </Box>
  );
};

export default Agents;
