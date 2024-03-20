"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [spins, setSpins] = useState(0);
  const [error, setError] = useState(null);
  const [logined, setLogined] = useState(false);

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
