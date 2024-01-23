import { useAuthStore } from "@/store";
import { validPaths } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";

const PublicProtectedRoute = () => {
  const { authenticated } = useAuthStore();

  return authenticated ? <Navigate to={validPaths.dashboard.path} /> : <Outlet />;
};

export default PublicProtectedRoute;
