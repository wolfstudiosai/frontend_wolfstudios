import { AuthContext } from "/src/contexts/auth/AuthContext";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);
export default useAuth;
