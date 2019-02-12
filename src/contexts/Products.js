// @flow
import React, { useState, useEffect, type Node } from "react";
import API from "API";

const Context: React$Context<Array<Product>> = React.createContext([]);

/*
 * The ProductLoader loads the Products just once, ideally at the start of the
 * Application. Products are unlikely to change over time so we only want
 * to load them once.
 */
export const ProductLoader = ({ children }: { children: Node }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    API.getAllProducts()
      .then((response) => {
        setProducts(response.data);
      });
  }, []);
  return (
    <Context.Provider value={products}>
      {children}
    </Context.Provider>
  );
};

export default Context;
