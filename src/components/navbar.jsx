import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../img/logos/logo_1.png";
import "../stylesheets/navbar.css";
import getCookie from "./Scripts/getCookies";
import setCookie from "./Scripts/borrarCookies";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { BiArrowBack } from "react-icons/bi"
import dafaultPhotoUser from "../img/default_user.png";


function NavBar(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [buttonNavigate, setbuttonNavigate] = useState(false)
  const { setIsLogout } = props;
  const url = process.env.REACT_APP_URL_HOST;
  const isLoggedIn = useSelector((state) => state.auth_digital_cloud.is_logged_in);
  const name = useSelector((state) => state.auth_digital_cloud.name);
  const photo = useSelector((state) => state.auth_digital_cloud.photo);
  const logOut = () => {
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: "Token " + getCookie("token"),
        Module: "user",
      },
      body: JSON.stringify({
        logout_request: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCookie("loggedIn", false);
        setIsLogout(false);
        dispatch(logout());
      });
  };
  const navigate = useNavigate();
  const navigateTo = ()=>{
    if(location.pathname==="/Login"){
      navigate("/")
    }else{
      navigate(-1)
    }
    
  }

  useEffect(()=>{
    if(location.pathname === "/" || location.pathname === "/AdminPAge"
      || location.pathname === "/ChefPage" || location.pathname === "/WaiterPage" ){
      setbuttonNavigate(false)
    }else{
      setbuttonNavigate(true)
    }
  },[location])

  return (
    <>
    {isLoggedIn&&
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand logo_container" href="/">
              <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-text-top"/>
              <p className="responsive_logo">Digital Technology Cloud</p>
            </a>
            <div id="navbarText">
            <ul className="navbar-nav">
              <li>
              {buttonNavigate? 
                    <button className="btn btn-secondary button_back" onClick={navigateTo}>
                      <BiArrowBack />
                    </button> 
                  : <></> }
              </li>
              <li className="nav-item dropdown">
                <div className="name_container" href="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <div className="avatar_cotainer">
                  <img className="avatar" src={photo !== ""? url + photo:dafaultPhotoUser} alt="" />
                 </div>
                  {name}
                </div>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><div onClick={logOut} className="dropdown-item close_sesion_button">Cerrar Sesión</div></li>
                </ul>
              </li>
            </ul>
            </div>
          </div>
        </nav>
      </>
    }

    </>
  );
}

export default NavBar;

