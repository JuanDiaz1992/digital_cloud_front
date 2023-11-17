import { useEffect, useState } from "react";
import getCookie from "../../Scripts/getCookies";
import dateToday from "../../Scripts/obtenerFechaActual";
function ViewBills({ closeModal }) {
  const [dateToConsult, setDateToConsult] = useState(dateToday());
  const [bills,setBills] = useState([])
  const url = process.env.REACT_APP_URL_HOST;

  useEffect(()=>{
    try{
      fetch(`${url}facturas?equalTo=${dateToConsult}`,{
        method:"GET",
        mode:"cors",
        headers:{
          Authorization: "Token " + getCookie("token"),
          'Module': 'documents'
        }
      })
      .then(response=>response.json())
      .then(data=>{
        if(data["status"]===200){
          setBills(data["results"])
        }else{
          setBills([])
        }
      })
    }catch(error){
      console.log(error)
    }
  },[dateToConsult])
  return (
    <>
      <div className="modal-dialog modal_view_bills">
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">Facturas</h5>
            <button
              className="btn-close"
              onClick={() => {
                closeModal();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div>
            <div className="mb-3 imput_container_update_bill">
              <label htmlFor="dateConsult">Elija la fecha a consultar:</label>
              <input onChange={(e)=>setDateToConsult(e.target.value)} value={dateToConsult} type="date"  id="dateConsult" />
            </div>
            <div className="modal_view_bills--content">
              {bills.length>0?
              <table class="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Monto</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(bill=>(
                  <tr key={bill["id"]}>
                    <th scope="row">{bill["id_factura"]}</th>
                    <td colspan="2"><img className="img_bill" src={url + bill["picture"]} alt="" /></td>
                    <td colspan="2">{bill["date"]}</td>
                    <td colspan="2">{bill["total"]}</td>
                  </tr>
                ))}

              </tbody>
            </table>
            :
            <div className="empty_bills">
              <h3>No hay facturas registradas en esta fecha</h3>
            </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewBills;
