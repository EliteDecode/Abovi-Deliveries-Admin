import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [activeTransactions, setActiveTransactions] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [completedTransactions, setCompletedTransactions] = useState([]);
  const [cancelledTransactions, setCancelledTransactions] = useState([]);
  const [menu, setMenu] = useState(true);

  const handleMenu = () => {
    setMenu(!menu);
  };

  // const getData = async () => {
  //   setLoading(true);
  //   axios.get("https://datamachapi.onrender.com").then((data) => {
  //     const response = data.data;
  //     var tempData = [];
  //     var number = 1;
  //     for (let index = 0; index < response.length; index++) {
  //       tempData.push({
  //         id: number++,
  //         Firstname: response[index]["Firstname"],
  //         Lastname: response[index]["Lastname"],
  //         Email: response[index]["Email"],
  //         Address: response[index]["Address"],
  //         University: response[index]["University"],
  //       });
  //     }

  //     setUserData(tempData);
  //     setLoading(false);

  //     return tempData;
  //   });
  // };

  const getAgents = async () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_ABOVI_URL}/agents`).then((data) => {
      const response = data.data;
      var tempData = [];
      var number = 1;
      for (let index = 0; index < response.length; index++) {
        tempData.push({
          id: number++,
          Firstname: response[index]["Firstname"],
          Lastname: response[index]["Lastname"],
          Email: response[index]["Email"],
          Address: response[index]["Address"],
          Phone: response[index]["Phone"],
          Verified: response[index]["VerifiedUser"],
        });
      }

      setAgentData(tempData);
      setLoading(false);
    });
  };

  const getActiveTransactions = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/transactions/active`)
      .then((data) => {
        const response = data.data;
        var tempData = [];
        var number = 1;
        for (let index = 0; index < response.length; index++) {
          tempData.push({
            id: number++,
            ProductName: response[index]["ProductName"],
            ProductWeight: response[index]["ProductWeight"],
            ProductQuantity: response[index]["ProductQuantity"],
            ProductLocation: response[index]["ProductLocation"],
            TransactionID: response[index]["TransactionID"],
            DatabaseID: response[index]["_id"],
          });
        }
        console.log(tempData);
        setActiveTransactions(tempData);
        setLoading(false);
      });
  };

  const getPendingTransactions = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/transactions/pending`)
      .then((data) => {
        const response = data.data;
        var tempData = [];
        var number = 1;
        for (let index = 0; index < response.length; index++) {
          tempData.push({
            id: number++,
            ProductName: response[index]["ProductName"],
            ProductWeight: response[index]["ProductWeight"],
            ProductQuantity: response[index]["ProductQuantity"],
            ProductLocation: response[index]["ProductLocation"],
            TransactionID: response[index]["TransactionID"],
            DatabaseID: response[index]["_id"],
          });
        }
        console.log(tempData);
        setPendingTransactions(tempData);
        setLoading(false);
      });
  };

  const getCompletedTransactions = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/transactions/completed`)
      .then((data) => {
        const response = data.data;
        var tempData = [];
        var number = 1;
        for (let index = 0; index < response.length; index++) {
          tempData.push({
            id: number++,
            ProductName: response[index]["ProductName"],
            ProductWeight: response[index]["ProductWeight"],
            ProductQuantity: response[index]["ProductQuantity"],
            ProductLocation: response[index]["ProductLocation"],
            TransactionID: response[index]["TransactionID"],
            DatabaseID: response[index]["_id"],
          });
        }
        console.log(tempData);
        setCompletedTransactions(tempData);
        setLoading(false);
      });
  };

  const getCancelledTransactions = async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_ABOVI_URL}/transactions/cancelled`)
      .then((data) => {
        const response = data.data;
        var tempData = [];
        var number = 1;
        for (let index = 0; index < response.length; index++) {
          tempData.push({
            id: number++,
            ProductName: response[index]["ProductName"],
            ProductWeight: response[index]["ProductWeight"],
            ProductQuantity: response[index]["ProductQuantity"],
            ProductLocation: response[index]["ProductLocation"],
            TransactionID: response[index]["TransactionID"],
            DatabaseID: response[index]["_id"],
          });
        }
        console.log(tempData);
        setCancelledTransactions(tempData);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAgents();
    getActiveTransactions();
    getPendingTransactions();
    getCompletedTransactions();
    getCancelledTransactions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        userData,
        agentData,
        getAgents,
        setAgentData,
        handleMenu,
        activeTransactions,
        pendingTransactions,
        completedTransactions,
        cancelledTransactions,
        menu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
