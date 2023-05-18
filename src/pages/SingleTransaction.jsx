import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { url } from "../utils";
const SingleTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [agentLoading, setAgentLoading] = useState(false);
  const [transactionData, setData] = useState();
  const [agentData, setAgentData] = useState();
  const { TransactionID } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/transactions/${TransactionID}`)
      .then((data) => {
        setData(data.data);
        console.log(data.data);
        setLoading(false);
      });
  }, [TransactionID]);

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
            <Grid item xs={12} sm={12} md={6}>
              <Box
                component="div"
                className="  bg-gray-100 shadow-lg rounded-lg py-3 px-5"
              >
                <Typography
                  sx={{
                    fontSize: 25,
                    fontWeight: "bolder",
                    marginBottom: 2,
                    opacity: "0.8",
                    color: "#172554",
                  }}
                >
                  Product Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box className="border-gray-50">
                      <Box classNamee="">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Product Name
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.ProductName}
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
                          Product Weight
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.ProductWeight}
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
                          Product Quantity
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",

                            textTransform: "capitalize",
                          }}
                        >
                          {transactionData?.ProductQuantity}
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
                          Product Location
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.ProductLocation}
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
                          Other Notes
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.OtherNotes}
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
                          Status
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          disableElevation
                          sx={{ fontSize: 12, textTransform: "capitalize" }}
                          color={
                            transactionData?.Status === "Pending"
                              ? "warning"
                              : transactionData?.Status === "Completed"
                              ? "success"
                              : "error"
                          }
                        >
                          {transactionData?.Status}
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                component="div"
                className=" mt-5 bg-gray-100 shadow-lg rounded-lg py-3 px-5"
              >
                <Typography
                  sx={{
                    fontSize: 25,
                    fontWeight: "bolder",
                    marginBottom: 2,
                    opacity: "0.8",
                    color: "#172554",
                  }}
                >
                  Sender Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box className="border-gray-50">
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
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SenderFirstname}
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
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SenderLastname}
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
                            fontSize: "12px",

                            textTransform: "capitalize",
                          }}
                        >
                          {transactionData?.SenderEmail}
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
                          Phone Number
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SenderPhone}
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
                          Address
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SenderAddress}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                component="div"
                className=" bg-gray-100 shadow-lg rounded-lg py-3 px-5"
              >
                <Typography
                  sx={{
                    fontSize: 25,
                    fontWeight: "bolder",
                    marginBottom: 2,
                    opacity: "0.8",
                    color: "#172554",
                  }}
                >
                  Transaction Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Box className="border-gray-50">
                      <Box classNamee="">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            opacity: "90%",
                            color: "#1d4ed8",
                            fontWeight: "bolder",
                          }}
                        >
                          Agent
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SalesRep != ""
                            ? transactionData?.SalesRep
                            : "This Transaction has not be assigned yet"}
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
                          Agent's Comment
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SalesRepComment != null
                            ? transactionData?.SalesRepComment
                            : "No comments"}
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
                          Closing Amount
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                          }}
                        >
                          {transactionData?.ClosingAmount != null
                            ? transactionData?.ClosingAmount
                            : " No amount"}
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
                          Initiated At
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {new Date(transactionData?.createdAt)
                            .toLocaleString()
                            .replace(",", "")}
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
                          Address
                        </Typography>
                        <Typography sx={{ fontSize: "12px" }}>
                          {transactionData?.SenderAddress}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SingleTransaction;
