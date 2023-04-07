import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import signupImg from "../assets/d1.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { url, validateSchema } from "../utils/index";
import { toast } from "react-toastify";
const AddAgents = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      Firstname: "",
      Lastname: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      Address: "",
      Phone: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, actions) => {
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_ABOVI_URL}/agents/register`, {
          ...values,
        })
        .then((data) => {
          setLoading(false);
          setSubmitting(false);
          console.log(data);
          toast.success("Congratulations you have added an Agent ", {
            position: "bottom-right",
            onClose: () => {
              navigate("/");
            },
          });
        })
        .catch((error) => {
          setLoading(false);
          setSubmitting(false);
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

  useEffect(() => {}, []);

  return (
    <Box className=" p-4 w-full">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7}>
            <Box
              component="div"
              className=" shadow-lg bg-gray-100 rounded-lg py-3 sm:px-10 px-2"
            >
              <Typography variant="h5" sx={{ lineHeight: "2.4rem" }}>
                Add a new
                <br />{" "}
                <Typography
                  variant="span"
                  sx={{
                    fontSize: "45px",
                    fontWeight: "bolder",
                    color: "#1d4ed8",
                  }}
                >
                  Sales Agent
                </Typography>
              </Typography>
              <Box
                onSubmit={handleSubmit}
                component="form"
                sx={{
                  "& .MuiTextField-root": { width: "100%" },
                  padding: 0,
                  margin: "5% 0%",
                }}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <div>
                      <TextField
                        label="First Name"
                        id="Firstname"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.Firstname}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Firstname && touched.Firstname && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Firstname}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div>
                      <TextField
                        label="Last Name"
                        id="Lastname"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.Lastname}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Lastname && touched.Lastname && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Lastname}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div>
                      <TextField
                        label="Email Address"
                        id="Email"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        onChange={handleChange}
                        value={values.Email}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Email && touched.Email && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Email}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <TextField
                        label="Phone"
                        id="Phone"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.Phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Phone && touched.Phone && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Phone}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <TextField
                        label="Address"
                        id="Address"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.Address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Address && touched.Address && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Address}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <TextField
                        label="Password"
                        id="Password"
                        type="password"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.Password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.Password && touched.Password && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.Password}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <TextField
                        label="Retype Password"
                        id="ConfirmPassword"
                        type="password"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.ConfirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.ConfirmPassword && touched.ConfirmPassword && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.ConfirmPassword}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                {isSubmitting ? (
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
                    Please wait...
                  </Button>
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
                    Continue
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box component="div" className="mt-4 flex justify-center">
              <img
                src={signupImg}
                alt="sign up images"
                width="90%"
                className="sm:block hidden"
              />
            </Box>{" "}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddAgents;
