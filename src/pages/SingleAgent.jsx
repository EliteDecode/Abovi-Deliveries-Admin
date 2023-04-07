import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useNavigate, useParams } from "react-router-dom";

import { useFormik } from "formik";
import { updateSchema } from "../utils/index";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { Delete } from "@mui/icons-material";
const SingleAgent = () => {
  const [loading, setLoading] = useState(false);
  const [isLoadingSuspend, setSuspendLoading] = useState(false);
  const [laodingDelete, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const [agentData, setData] = useState();
  const { Email } = useParams();

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

        return toast.error(message, {
          position: "bottom-right",
          autoClose: 1000,
        });
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

        return toast.error(message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_ABOVI_URL}/agents/${agentData?._id}`)
      .then((data) => {
        setDeleteLoading(false);
        console.log(data);
        toast.info("You have deleted this account ", {
          position: "bottom-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/admin/agents");
          },
        });
      })
      .catch((error) => {
        setDeleteLoading(false);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        return toast.error(message, {
          position: "bottom-right",
          autoClose: 1000,
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/agents/agent/${Email}`)
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, [Email]);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      Firstname: agentData?.Firstname,
      Lastname: agentData?.Firstname,
      Email: Email,
      Password: agentData?.Password,
      Address: agentData?.Address,
      Phone: agentData?.Phone,
    },
    validationSchema: updateSchema,
    onSubmit: (values, actions) => {
      setLoading(true);

      const data = {
        ...values,
        id: agentData._id,
      };

      console.log(data);
      axios
        .put(`${process.env.REACT_APP_ABOVI_URL}/agents/update`, data)
        .then((data) => {
          setLoading(false);
          setSubmitting(false);
          console.log(data);
          toast.success("Congratulations you have added an Agent ", {
            position: "bottom-right",
            autoClose: 1000,
            onClose: () => {
              navigate("/admin/agents");
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

  return (
    <Box className=" p-4 w-full">
      <Container>
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Box
                component="div"
                className=" shadow-lg bg-gray-100 rounded-lg py-3 sm:px-10 px-2"
              >
                <Typography variant="h5" sx={{ lineHeight: "2.4rem" }}>
                  Edit
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
                  <Typography variant="h6" sx={{ color: "red", fontSize: 11 }}>
                    Leave the password field blank if you do not want to change
                    the password (*)
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
                          defaultValue={agentData?.Firstname}
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
                          defaultValue={agentData?.Lastname}
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
                          defaultValue={agentData?.Email}
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
                          defaultValue={agentData?.Phone}
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
                          defaultValue={agentData?.Address}
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

                    <Grid item xs={12} sm={12} md={12}>
                      <div>
                        <TextField
                          label="Password"
                          id="Password"
                          defaultValue="passwordX^5%21$5()"
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
                      Update
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Box
                component="div"
                className="flex  bg-gray-100 shadow-lg rounded-lg py-3 px-5"
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box className=" border-gray-50">
                      <Box classNamee="">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Firstname
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                          {agentData?.Firstname}
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: "10%" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Lastname
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                          {agentData?.Lastname}
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: "10%" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Email
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",

                            textTransform: "capitalize",
                          }}
                        >
                          {agentData?.Email}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box className=" border-gray-50">
                      <Box classNamee="">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Address
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                          {agentData?.Address}
                        </Typography>
                      </Box>
                      <Box sx={{ marginTop: "10%" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Phone
                        </Typography>
                        <Typography sx={{ fontSize: "16px" }}>
                          {agentData?.Phone}
                        </Typography>
                      </Box>

                      <Box sx={{ marginTop: "10%" }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Account
                        </Typography>

                        <Box className="flex items-center space-x-2 ">
                          {agentData?.VerifiedUser ? (
                            <Button
                              onClick={() => handleSuspend(agentData?.Email)}
                              variant="contained"
                              sx={{ fontSize: 10 }}
                              size="small"
                              disableElevation
                              color="success"
                              endIcon={
                                <PendingActionsIcon sx={{ fontSize: 10 }} />
                              }
                            >
                              {isLoadingSuspend ? (
                                <ClipLoader
                                  color="white"
                                  loading="loading"
                                  size={10}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                "Active"
                              )}
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleActive(agentData?.Email)}
                              variant="contained"
                              sx={{ fontSize: 10 }}
                              size="small"
                              disableElevation
                              color="warning"
                              endIcon={
                                <PendingActionsIcon sx={{ fontSize: 10 }} />
                              }
                            >
                              {isLoadingSuspend ? (
                                <ClipLoader
                                  color="white"
                                  loading="loading"
                                  size={10}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                />
                              ) : (
                                "Suspended"
                              )}
                            </Button>
                          )}

                          <Button
                            variant="contained"
                            onClick={handleDelete}
                            sx={{ fontSize: 10 }}
                            size="small"
                            disableElevation
                            color="error"
                            endIcon={<Delete sx={{ fontSize: 10 }} />}
                          >
                            {laodingDelete ? (
                              <ClipLoader
                                color="white"
                                loading="loading"
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>{" "}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SingleAgent;
