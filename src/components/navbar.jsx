
import { useSelector } from "react-redux";
import logo from "../img/logos/logo_1.png";
import "../stylesheets/navbar.css";
import getCookie from "./Scripts/getCookies";
import setCookie from "./Scripts/borrarCookies";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import dafaultPhotoUser from "../img/default_user.png";


function NavBar(props) {
  const dispatch = useDispatch();
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

  return (
    <>
    {isLoggedIn&&
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand logo_container" href="/">
              <img src={logo} alt="logo" width="30" height="24" className="d-inline-block align-text-top"/>
            </a>
            <div id="navbarText">
            <ul className="navbar-nav">
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

