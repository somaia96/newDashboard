import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";

const getToken = () => {
    return localStorage.getItem('tokenMunicipality');
};

interface IProps {
    children:ReactNode,
    redirectPath:string,
}

const ProtectedRoute = ({children,redirectPath}:IProps) => {
    const [isAllowed] = useState((getToken()) ? true : false)
    if(!isAllowed) return <Navigate to={redirectPath}/>
  return children;
}

export default ProtectedRoute

