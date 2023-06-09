import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../utils";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    handleBlur,

    values,
    errors,
  } = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: (values, actions) => {
      var Email = values.Email;
      var Password = values.Password;
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_ABOVI_URL}/admin/login`, {
          Email: Email,
          Password: Password,
        })
        .then((data) => {
          setLoading(false);
          const user = {
            Email: data.data.Email,
            Id: data.data._id,
          };
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Congratulations you are logged in ", {
            onClose: () => {
              navigate("/admin");
            },
          });
        })
        .catch((error) => {
          setLoading(false);
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          return toast.error(message);
        });
    },
  });

  return (
    <Box className="flex items-center justify-center h-screen bg-gray-200 ">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <Box
              component="div"
              className=" sm:p-20 p-3 bg-white shadow-lg rounded-lg"
            >
              <Typography variant="h5" sx={{ lineHeight: "2.4rem" }}>
                Welcome back to 👋 <br />{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "45px",
                    fontWeight: "bolder",
                    color: "#1d4ed8",
                  }}
                >
                  Aboviph
                </Typography>
              </Typography>
              <Typography component="paragraph" sx={{ fontSize: "12px" }}>
                Welcome back. Login to access unique features that allow you
                sort out all activities on Datamach
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "100%" },
                  padding: 0,
                  margin: "5% 0%",
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <TextField
                        label="Email Address"
                        id="Email"
                        size="small"
                        type="email"
                        values={values.Email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{ style: { fontSize: 16 } }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <div>
                      <TextField
                        label="Password"
                        id="Password"
                        size="small"
                        type="password"
                        values={values.Password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{ style: { fontSize: 16 } }}
                      />
                    </div>
                  </Grid>
                </Grid>

                {loading ? (
                  <Box className="mt-4">
                    <ClipLoader
                      color="blue"
                      loading="loading"
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1e40af",
                      textTransform: "none",
                      fontWeight: "bold",
                      marginTop: "3%",
                    }}
                    className="bg-blue-700"
                    size="medium"
                    type="submit"
                  >
                    Login Now
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminLogin;
