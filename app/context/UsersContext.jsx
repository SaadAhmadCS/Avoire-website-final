// app/context/UsersContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // 👉 instant optimistic remove
  const removeUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // 👉 optional (for add user)
  const addUser = (user) => {
    setUsers(prev => [user, ...prev]);
  };

  return (
    <UserContext.Provider value={{ users, removeUser, addUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useAdminUsers() {
  return useContext(UserContext);
}
