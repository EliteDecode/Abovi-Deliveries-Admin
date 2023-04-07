import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
const User = () => {
  const { Email } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  var imgURL = `https://datamachapi.onrender.com/uploads/${data?.Profile}`;
  var idURL = `https://datamachapi.onrender.com/uploads/${data?.ID}`;

  useEffect(() => {
    setLoading(true);
    axios.get(`https://datamachapi.onrender.com/${Email}`).then((data) => {
      const resp = data.data[0];

      setData(resp);
      setLoading(false);
    });
  }, []);

  return (
    <Box className="border p-5 w-full flex items-center justify-center h-min-screen bg-gray-100">
      <Box className="border shadow-xl rounded-md w-3/4 bg-white h-min-screen px-5 py-5">
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="  pt-5  flex">
                <img
                  src={imgURL}
                  alt="passport"
                  className="rounded-md h-32 w-32"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="border-r-2 border-gray-50">
                <Box classNamee="">
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    Firstname
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.Firstname}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "10%" }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    Lastname
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.Lastname}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "10%" }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    Address
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.Address}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="border-r-2 border-gray-50">
                <Box classNamee="">
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    Email
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.Email}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "10%" }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    Phone
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.Phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="border-r-2 border-gray-50">
                <Box classNamee="">
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    University/School of Graduation
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>
                    {data?.University}
                  </Typography>
                </Box>
                <Box sx={{ marginTop: "10%" }}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                    GPA/JAMB Score
                  </Typography>
                  <Typography sx={{ fontSize: "16px" }}>{data?.GPA}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="pt-5 flex items-center justify-center">
                <img src={idURL} alt="passport" className="" />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default User;
