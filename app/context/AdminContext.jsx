
"use client"
import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
     const [metrics, setMetrics] = useState({});
     const [orders, setOrders] = useState([]);
     const [pendingShipments, setPendingShipments] = useState([]);
     const [topSelling, setTopSelling] = useState([]);

     // Fetch metrics from API
     const fetchMetrics = async () => {
          const res = await fetch("/api/admin/metrics");
          const data = await res.json();
          setMetrics(data);
     };

     // Fetch orders from API
     const fetchOrders = async () => {
          const res = await fetch("/api/admin/orders");
          const data = await res.json();
          setOrders(data);
     };

     const fetchPendingShipments = async () => {
          const res = await fetch("/api/admin/pending-shipments");
          const data = await res.json();
          setPendingShipments(data.pendingShipments);
     };

     const fetchTOPSKUs = async () => {
          const res = await fetch("/api/admin/top-selling");
          const data = await res.json();
          setTopSelling(data);
     };

     useEffect(() => {
          fetchMetrics();
          fetchOrders();
          fetchPendingShipments();
          fetchTOPSKUs();
          const interval = setInterval(fetchTOPSKUs, 15000); // every 15s
          return () => clearInterval(interval);
     }, []);

     return (
          <AdminContext.Provider value={{ metrics, orders, pendingShipments, fetchMetrics, fetchOrders, fetchPendingShipments, topSelling, fetchTOPSKUs }}>
               {children}
          </AdminContext.Provider>
     );
};

export function useAdmin() {
     return useContext(AdminContext);
}

