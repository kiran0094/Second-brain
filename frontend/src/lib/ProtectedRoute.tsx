import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import axios from "axios";



export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);



  useEffect(() => {

    // Check with the backend if the httpOnly cookie is valid

    axios

      .get("http://localhost:3000/api/v1/me", { withCredentials: true })

      .then(() => setIsAuthenticated(true))

      .catch(() => setIsAuthenticated(false))

      .finally(() => setLoading(false));

  }, []);



  if (loading) return <div>Loading...</div>;



  if (!isAuthenticated) {

    return <Navigate to="/signin" replace />;

  }



  return children;

};

