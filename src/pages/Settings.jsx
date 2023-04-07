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
import { Link, json, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updatePasswordSchema, validateSchema } from "../utils/index";
import { toast } from "react-toastify";
const Settings = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const ls = localStorage.getItem("user");
    setData(JSON.parse(ls));
  }, []);
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
      Password: "",
      NewPassword: "",
      ConfirmNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values, actions) => {
      setLoading(true);
      axios
        .put(`${process.env.URL}/admin/update_password`, {
          ...values,
          id: data?.Id,
        })
        .then((data) => {
          setLoading(false);
          setSubmitting(false);
          console.log(data);

          toast.success("Congratulations you have updated your password ", {
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

          return toast.error(message, {
            position: "bottom-right",
          });
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
                Update Password
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
                        label="New Password"
                        id="NewPassword"
                        type="password"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.NewPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.NewPassword && touched.NewPassword && (
                      <Typography sx={{ fontSize: "11px", color: "red" }}>
                        {errors.NewPassword}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div>
                      <TextField
                        label="Retype Password"
                        id="ConfirmNewPassword"
                        type="password"
                        size="small"
                        autoComplete="new-password"
                        inputProps={{ style: { fontSize: 16 } }}
                        value={values.ConfirmNewPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {errors.ConfirmNewPassword &&
                      touched.ConfirmNewPassword && (
                        <Typography sx={{ fontSize: "11px", color: "red" }}>
                          {errors.ConfirmNewPassword}
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
          <Grid item xs={12} sm={12} md={5}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Settings;
