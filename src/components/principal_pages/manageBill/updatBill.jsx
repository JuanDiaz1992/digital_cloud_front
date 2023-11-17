
import { useState } from "react";
import getDate from "../../Scripts/obtenerFechaActual";
import Swal from "sweetalert2";
import getCookie from "../../Scripts/getCookies";
function UpdateBill({ closeModal }) {
  const url = process.env.REACT_APP_URL_HOST;
  const [date, setDate ] = useState(getDate());
  const [photo, getPhoto] = useState(null);
  const [total,setTotal] = useState("");

  const sendForm = async (e)=>{
    e.preventDefault();
    if (date !=="" && photo !== null && total !=="") {
      let formData = new FormData();
      formData.append("date", date);
      const timestamp = Date.now();
      const newName = `factura_${timestamp}.jpg`;
      const modifiedFile = new File([photo], newName, { type: photo.type });
      formData.append("photo", modifiedFile);
      formData.append("total", total);
      formData.append("update_bill", true);
      try{
        await fetch(url, {
          method: "POST",
          mode: "cors",
          body: formData,
          headers: {
            Authorization: "Token " + getCookie("token"),
            'Module': 'documents'
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
            if (data["status"] === 200) {
              Swal.fire({
                title: "Éxito",
                text: `Factura registrada correctamente con el id ${data["response"]}`,
                icon: "success",
                confirmButtonText: "Ok",
                willClose: function () {
                  closeModal()
                },
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
    }else{
      Swal.fire({
        title: "Datos incompletos",
        text: "Por favor completa todos los datos del formulario.",
        icon:"error",
        confirmButtonText: "Ok",
        willClose: function () {},
        customClass: {
          container: "notification-modal",
        },
      });
    }

  }

  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Subir factura</h5>
            <button
              className="btn-close"
              onClick={() => {
                closeModal();
              }}
              aria-label="Close"
            ></button>
          </div>
          <form
            onSubmit={(e)=>sendForm(e)}
            className="form_update_bill"
            id="formRegis"
            encType="multipart/form-data"
          >
          <div className="mb-3 imput_container_update_bill">
              <label htmlFor="date" className="label_createUser">Fecha que registra en la factura</label>
              <input id="date" value={date} onChange={(e)=>setDate(e.target.value)} type="date" />
          </div>
          <div className="mb-3">
              <label htmlFor="photo" className="label_createUser">
                Foto de factura:
              </label>
              {photo&& 
              <img className="temporal_photo" src={URL.createObjectURL(photo)} alt="" />
              }
              <input
                type="file"
                className="form-control"
                id="photo"
                accept="image/*" capture="camera"
                onChange={(e) => getPhoto(e.target.files[0])}
              />
            </div>
            <div className="mb-3 imput_container_update_bill">
              <label htmlFor="total" className="label_createUser">
                Total que registra en la factura:
              </label>
              <input
                type="number"
                id="total"
                value={total}
                onChange={(e) => {
                  setTotal(e.target.value);
                }}
                placeholder="$0.0"
              />
            </div>
            <button className="btn btn-primary" type="submit">Subir</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default UpdateBill;
