import { ContextFounder } from "../../../contexts/UserConrtrxt";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function OnlyUsersRoute({ children }) {
  const userGroup = jwtDecode(localStorage.getItem('token'))?.userGroup;
  return userGroup === "SystemUser" ? (
    children
  ) : (
    <Navigate to={"/notfound"} />
  );
}
