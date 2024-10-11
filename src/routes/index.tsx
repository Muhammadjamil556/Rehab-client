import useAuth from "../hooks/user-details";
import ProtectedRoutes from "./protected";
import PublicRoutes from "./public";

const AppRoutes = () => {
  const { accessToken, user } = useAuth();

  return (
    <div>{accessToken && user ? <ProtectedRoutes /> : <PublicRoutes />}</div>
  );
};

export default AppRoutes;
