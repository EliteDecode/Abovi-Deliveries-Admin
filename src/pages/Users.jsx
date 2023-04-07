import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { useGlobalContext } from "../utils/context";
const Users = () => {
  const { loading, userData } = useGlobalContext();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Firstname",
      headerName: "First name",
      width: 150,
    },
    {
      field: "Lastname",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "Email",
      headerName: "Email",

      width: 200,
    },
    {
      field: "Address",
      headerName: "Address",
      width: 150,
    },

    {
      field: "University",
      headerName: "University",
      width: 160,
    },

    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/users/user/${params.row.Email}`}>
              <span>
                {" "}
                <button
                  type="small"
                  className="bg-blue-500 rounded-2xl py-1 px-3 uppercase font-bold text-[10px] text-white"
                >
                  View 👁️
                </button>
              </span>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      LastName: "Snow",
      FirstName: "Jon",
      Email: "snowjow@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 2,
      LastName: "Lannister",
      FirstName: "Cersei",
      Email: "lanister@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 3,
      LastName: "Lannister",
      FirstName: "Jaime",
      Email: "jaime@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 4,
      LastName: "Stark",
      FirstName: "Arya",
      Email: "Starck@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 5,
      LastName: "Targaryen",
      FirstName: "Daenerys",
      Email: "Starck@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 6,
      LastName: "Melisandre",
      FirstName: null,
      Email: "snowjow@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 7,
      LastName: "Clifford",
      FirstName: "Ferrara",
      Email: "snowjow@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 8,
      LastName: "Frances",
      FirstName: "Rossini",
      Email: "snowjow@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
    {
      id: 9,
      LastName: "Roxie",
      FirstName: "Harvey",
      Email: "snowjow@gmail.com",
      Address: "125 Ekehuan road",
      University: "Uniben",
    },
  ];

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
          Registered Users: {userData?.length || 0}
        </Typography>
      </Box>

      <Box sx={{ height: "70vh", width: "100%" }} className="z-0">
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
            rows={userData || rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
