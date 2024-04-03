"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import { URL } from "@/helpers/constants";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [spins, setSpins] = useState(0);
  const [error, setError] = useState(null);
  const [logined, setLogined] = useState(false);
  const [loginIndex, setloginIndex] = useState(null)
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(URL);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleLogined = () => {
    setLogined(true);
  };

  const toggleSpin = (a) => {
    setSpins(a);
  };

  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  const contextValue = useMemo(
    () => ({
      inventory,
      spins,
      toggleSpin,
      setInventory,
      togglePop,
      seen,
      error,
      logined,
      handleLogined,
      loginIndex,
      setloginIndex,
      users,
      fetchUsers
    }),
    [
      inventory,
      spins,
      toggleSpin,
      setInventory,
      togglePop,
      seen,
      logined,
      handleLogined,
      error,
      loginIndex,
      setloginIndex,
      users,
      fetchUsers
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("UseProduct must be used with productProvider");
  }
  return context;
}
