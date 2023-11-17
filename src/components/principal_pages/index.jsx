import "../../stylesheets/principal_pages/index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function Index() {
  const type_user = useSelector(state=>state.auth_digital_cloud.type_user)
  const navigate = useNavigate()
  const handleCiclik=(link)=>{
      navigate(`/${link}`)
  }

  return (
    <>
      <section className="section_index">
        <div className="cards_container">
          <div className="card_index" onClick={()=>handleCiclik("documents")}>
          <div className="card_docs"></div>
            <h3>Documentos</h3>
          </div>
          <div className="card_index">
          <div className="card_notifications"></div>
            <h3>Notificaciones</h3>
          </div>
          <div className="card_index">
          <div className="card_humana"></div>
            <h3>G. Humana</h3>
          </div>
          {type_user === 1 &&
            <div className="card_index" onClick={()=>handleCiclik("manageUser")}>
              <div className="card_user"></div>
              <h3>Usuarios</h3>
            </div>
          }
        </div>
      </section>
  
    </>
  );
}
export default Index;
