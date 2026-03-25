import { Navigate } from "react-router-dom";

function DriverRoute({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "driver") {
    return <Navigate to="/" />;
  }

  return children;
}

export default DriverRoute;