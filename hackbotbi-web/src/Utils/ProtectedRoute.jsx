import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("/check-session", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.logged);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;