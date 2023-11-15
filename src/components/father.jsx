import {React, useEffect, useState} from "react";
import { Outlet, useNavigate,useLocation  } from "react-router-dom";
import NavBar from './navbar';
import Footer from './footer'
import "../stylesheets/normalize.css"
import "../stylesheets/generalStylesheets.css"
import { useSelector , useDispatch } from "react-redux";
import getCookie from "./Scripts/getCookies";
import { logout } from "../redux/userSlice";
import setCookie from "./Scripts/borrarCookies";
function FatherComponent(){
    const dispatch = useDispatch();
    let location = useLocation();
    const type_user = useSelector(state => state.auth_digital_cloud.type_user );
    const url = process.env.REACT_APP_URL_HOST;
    const validateSession=()=>{
        fetch(`${url}validateSession`, {
            method:"get",
            mode:"cors",
            headers:{
                Authorization: "Token " + getCookie("token"),
                Module: "user",
            }     
        })
        .then(response=>response.json())
        .then(data=>{
            if (!data.status === 200) {
                dispatch(logout());
                setCookie("loggedIn", false);
            }
        })
        .catch(error => {
            dispatch(logout());
            setCookie("loggedIn", false);
        })
    }
    const navigate = useNavigate()
    const [isLogout,setIsLogout] = useState(false)
    useEffect(()=>{
        validateSession()
        if(type_user === 0 && location.pathname !== "/newRecord" ){
            navigate("/login")
        }else if (type_user > 0 && location.pathname === "/newRecord"){
            navigate("/")
        }
        setIsLogout(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type_user,isLogout,location.pathname])
    
    return(
        <>
            <div className="app-container">
            <NavBar setIsLogout={setIsLogout} />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
            </div>

        </>
    )
}

export default FatherComponent