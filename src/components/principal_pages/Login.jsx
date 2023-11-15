import "../../stylesheets/principal_pages/login.css";
import logo from "../../img/logos/logo_3.png";
import { AiFillCloseCircle } from 'react-icons/ai';
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

function Login(){
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth_digital_cloud.is_logged_in);
    const url = process.env.REACT_APP_URL_HOST;
    const [name,setName] = useState("");
    const [password,setPassword] =useState("")
  

    const dispatch = useDispatch();
    const onLogin = async (e) => {
      e.preventDefault();
      try{
        await fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            "username": name,
            "password": password,
            "login_request":true,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Module': 'user'
          },
        })
          .then((response) => {
            if (response.ok) {
            } else {
              console.error();
            }
            return response.json();
          })
          .then(function (data) {
            if (data.is_logged_in) {
              dispatch(login(data));
              const token = data.token;
              Cookies.set('token', token, { SameSite: 'None', secure: true });
    
              navigate("/", {
                replace: true,
                state: {
                  logged: true,
                  name,
                },
              });
  
            } 
            else {
              Swal.fire({
                title: "Erro al loguearse",
                text: "Usuario o contraseña incorrectos",
                icon:"error",
                confirmButtonText: "Ok",
                willClose: function () {},
                customClass: {
                  container: "notification-modal",
                },
              });
            }
          });
      }
      catch{
        Swal.fire({
          title: "Erro al loguearse",
          text: "Usuario o contraseña incorrectos",
          icon:"error",
          confirmButtonText: "Ok",
          willClose: function () {},
          customClass: {
            container: "notification-modal",
          },
        });
      }

    };
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/", { replace: true });
      }
    }, [isLoggedIn, navigate]);
    return(
        <>
            <section className="section1_login dark text-foreground bg-background" >
                <img className="section1__logoform" src={logo} alt="logoGesthor" />
                <form onSubmit={onLogin} className="formLogin" id="formLogin" method="post" action="">
                    <div className="formLogin__inputsPrincipales">
                        <input 
                            value={name}
                            name = "username"
                            onChange={(e)=>{setName(e.target.value)}}
                            type="text" 
                            placeholder="Usuario" 
                            required/>
                    </div>
                    <div className="formLogin__inputsPrincipales">
                        <input 
                            type="password" 
                            name = "password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            placeholder="Contraseña"  
                            required />
                    </div> 
                    <button className="login_button" type="submit">Iniciar Sesión</button>
                </form>
              </section>

        </>
    )
}
export default Login;