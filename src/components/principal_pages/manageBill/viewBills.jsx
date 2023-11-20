import { useEffect, useState, useCallback } from "react";
import ImageViewer from 'react-simple-image-viewer';
import getCookie from "../../Scripts/getCookies";
import dateToday from "../../Scripts/obtenerFechaActual";
function ViewBills({ closeModal }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const [dateToConsult, setDateToConsult] = useState(dateToday());
  const [bills,setBills] = useState([])
  const [imgs,setImgs] = useState([]);
  const url = process.env.REACT_APP_URL_HOST;


  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

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
          const element = [];
          for (let i = 0; i < data["results"].length; i++) {
            element.push(url + data["results"][i]["picture"]) 
          }
          setBills(data["results"]);
          setImgs(element)

        }else{
          setBills([]);
        }
      })
    }catch(error){
      console.log(error);
    }
  },[dateToConsult]);
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
              {imgs.length>0?
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Monto</th>
                </tr>
              </thead>
              <tbody>

                  {imgs.map((img,index)=>(
                    <tr key={index}>
                      <th scope="row">{bills[index]["id_factura"]}</th>
                      <td colSpan="2">
                        <img 
                          className="img_bill" 
                          onClick={ () => openImageViewer(index) }
                          src={img} alt="" />
                      </td>
                      <td colSpan="2">{bills[index]["date"]}</td>
                      <td colSpan="2">{bills[index]["total"]}</td>
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
      {isViewerOpen && (
        <ImageViewer
          src={ imgs }
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
    </>
  );
}
export default ViewBills;
