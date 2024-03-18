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
  const [spins, setSpins] = useState(30)
  const [error, setError] = useState(null);

  const contextValue = useMemo(
    () => ({
      inventory,
      spins,
      setSpins,
      setInventory,
      error,
    }),
    [inventory, spins, setSpins, setInventory, error]
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
