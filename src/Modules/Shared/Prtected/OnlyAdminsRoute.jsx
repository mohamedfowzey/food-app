import { ContextFounder } from "../../../contexts/UserConrtrxt";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function OnlyAdminsRoute({ children }) {
  const userGroup = jwtDecode(localStorage.getItem('token'))?.userGroup;
  return userGroup === "SuperAdmin" ? (
    children
  ) : (
    <Navigate to={"/notfound"} />
  );
}
