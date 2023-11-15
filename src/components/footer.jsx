import { useSelector } from "react-redux";
function Footer(){
    const isLoggedIn = useSelector((state) => state.auth_digital_cloud.is_logged_in);
    return(
        <>
        {isLoggedIn &&
            <footer>
                <h5>Todos los derechos reservados</h5>
            </footer>
        }

        </>
    )
}
export default Footer