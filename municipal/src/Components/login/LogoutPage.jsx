import { useContext, useEffect } from "react";
import { logout } from "../../Functions/auth";
import DataContext from "../../Contexts/DataContext";
import { Navigate } from "react-router-dom";

function LogoutPage({ setRoleChange }) {
   const { makeMsg } = useContext(DataContext);
   useEffect(() => {
     logout();
     setRoleChange(Date.now());
     makeMsg('We hope you will come back soon! :)', 'info');
   }, [setRoleChange, makeMsg]);
 
   return <Navigate to="/login" replace />;
 }

 export default LogoutPage;