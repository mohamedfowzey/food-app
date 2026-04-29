import React, { useContext } from "react";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import { Navigate } from "react-router-dom";

export default function AuthorizedRoute({ children }) {
  const { user } = useContext(ContextFounder);
  
  return user?.userGroup === "SuperAdmin" ? (
    children
  ) : (
    <Navigate to={"/notfound"} />
  );
}
