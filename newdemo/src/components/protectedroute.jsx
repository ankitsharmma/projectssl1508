import { useAuth } from "../../src/Authcontext"
import { Navigate } from "react-router-dom";
const ProtextedRoute = ({ children }) => {

  const { islogin } = useAuth();
  if (!islogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtextedRoute;