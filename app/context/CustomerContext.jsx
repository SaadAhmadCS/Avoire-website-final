"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
     const [customers, setCustomers] = useState([]);

     // Fetch customers from your API
     useEffect(() => {
          const fetchCustomers = async () => {
               try {
                    const res = await fetch("/api/users");
                    const data = await res.json();
                    setCustomers(data);
               } catch (err) {
                    console.error("Error fetching customers:", err);
               }
          };

          fetchCustomers();
     }, []);

     return (
          <CustomerContext.Provider value={{ customers }}>
               {children}
          </CustomerContext.Provider>
     );
};

export const useCustomers = () => useContext(CustomerContext);
