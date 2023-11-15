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
          {type_user === 1 &&
            <div className="card_index" onClick={()=>handleCiclik("ManageUser")}>
              <h3>Usuarios</h3>
            </div>
          }
          <div className="card_index">
            <h3>Facturas</h3>
          </div>
          <div className="card_index">
            <h3>Facturas</h3>
          </div>
          <div className="card_index">
            <h3>Facturas</h3>
          </div>
        </div>

      </section>
  
    </>
  );
}
export default Index;
