import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getCookie from "../../Scripts/getCookies";
import { changeName } from "../../../redux/userSlice";
import Swal from "sweetalert2";

function EditUser(props) {
  const { setChangeState } = props;
  const userNAme = useSelector((state) => state.auth_digital_cloud.username);
  const name = useSelector((state) => state.auth_digital_cloud.name);
  const url = process.env.REACT_APP_URL_HOST;
  const dispatch = useDispatch();
  const [nameUSer, setnameUSer] = useState(props.nameUSer);
  const [nameIsOK, setNameIsOk] = useState(true);
  const [typeUser, settypeUser] = useState(props.typeUser);
  const [photoInput, getPhoto] = useState();
  const handlreChange = (e) => {
    let nUser = e.target.value;
    setnameUSer(nUser);
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (nUser.length >= 4 && !specialCharsRegex.test(nUser)) {
      setNameIsOk(true);
    } else {
      setNameIsOk(false);
    }
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (
      nameUSer === props.nameUSer &&
      typeUser === props.typeUser &&
      !photoInput
    ) {
      Swal.fire({
        title: "Advertencia",
        text: "No haz realizado ningún cambio",
        icon: "warning",
        confirmButtonText: "Ok",
        customClass: {
          container: "notification-modal",
        },
      });
    } else if (!nameIsOK) {
    } else {
      let formData = new FormData();
      formData.append("id", props.idUSer);
      formData.append("name", nameUSer);
      formData.append("username", props.userNameEdited);
      formData.append("photo", photoInput);
      formData.append("type_user", typeUser);
      formData.append("edit_user_request", true);
      fetch(url, {
        method: "POST",
        body: formData,
        mode: "cors",
        headers: {
          Authorization: "Token " + getCookie("token"),
          'Module': 'user'
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.registered) {
            if (userNAme === props.userNameEdited && nameUSer !== name) {
              dispatch(changeName({ name: nameUSer }));
            }
            setChangeState(true);
            Swal.fire({
              title: "Cambio Ok",
              text: data.message,
              icon: data.results,
              confirmButtonText: "Ok",
              customClass: {
                container: "notification-modal",
              },
              willClose: function () {
                props.closeModalEdit();
              },
            });
          }
        });
    }
  };

  return (
    <>
      <div className="modal-dialog modal_users">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar datos de usuario</h5>
            <button
              className="btn-close"
              onClick={() => {
                props.closeModalEdit();
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="imgEditUserContainer">
            <div className="profile_img_user_manage_container">
              <img
                    className="profile_img_user_manage_container--photo"
                    src={url + props.photo}
                    alt=""
                  />
            </div>

          </div>
          <form
            className="modal-body"
            encType="multipart/form-data"
            onSubmit={(e) => {
              sendForm(e);
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="label_createUser">
                Cambiar nombre:
              </label>
              <input
                type="text"
                className={
                  nameIsOK ? "form-control" : "is-invalid form-control"
                }
                id="name"
                value={nameUSer}
                onChange={(e) => {
                  handlreChange(e);
                }}
              />
              <div id="username" className={nameIsOK ? "d-none" : "form-text"}>
                <p>
                  Este campo no puede contener caracteres especiales y debe
                  contener más de 4 caracteres
                </p>
              </div>
            </div>
            {userNAme !== props.userNameEdited ? (
              <div className="mb-3">
                <label htmlFor="name" className="label_createUser">
                  Cambiar tipo de usuario:
                </label>
                <select
                  className="form-control"
                  id="type_user"
                  value={typeUser}
                  onChange={(e) => {
                    settypeUser(e.target.value);
                  }}
                  required
                >
                  <option value="2">Usuario Estandar</option>
                  <option value="1">Administrador</option>
                </select>
              </div>
            ) : (
              <></>
            )}
            <div className="mb-3">
              <label htmlFor="photo" className="label_createUser">
                Cambiar foto:
              </label>
              <input
                type="file"
                className="form-control"
                id="photo"
                onChange={(e) => getPhoto(e.target.files[0])}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  props.closeModalEdit();
                }}
              >
                Close
              </button>
              <button className={nameIsOK ? "btn btn-primary" : "btn btn-dark"}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditUser;
