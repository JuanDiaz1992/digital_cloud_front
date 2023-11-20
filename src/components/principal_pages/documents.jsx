import "../../stylesheets/principal_pages/documents.css";
import { useState } from "react";
import Modal from "react-modal";
import UpdateBill from "./manageBill/updatBill";
import ViewBills from "./manageBill/viewBills";
function Documents(){
    const [updateBillModal, setUpdateBillModal] = useState(false);
    const [viewBillsModal, setViewBillsModal] = useState(false)
    const openModal= (opc) => {
        switch (opc) {
            case 1:
                    setUpdateBillModal(true);
                break;
                case 2:
                    setViewBillsModal(true);
                break;       
            default:
                break;
        }

    };
    const closeModal = () => {
        setUpdateBillModal(false);
        setViewBillsModal(false)
      };
    return(
        <>
            <section className="section_documents">
                <div className="cards_documents_container">
                    <div className="card_documents" onClick={()=>openModal(1)}>
                        <div className="card_upload"></div>
                        <h3>Subir factura</h3>
                    </div>
                    <div className="card_documents" onClick={()=>openModal(2)}>
                        <div className="card_view_bills"></div>
                        <h3>Ver facturas</h3>
                    </div>
                    <div className="card_documents">
                        <div className="card_view_create_bills"></div>
                        <h3>Crear factura</h3>
                    </div>
                    <div className="card_documents">
                        <div className="card_view_supplies"></div>
                        <h3>Suministros</h3>
                    </div> 
                </div>

            </section>
        <Modal
            isOpen={updateBillModal}
            overlayClassName="overlay-custom"
        >
            <UpdateBill closeModal={closeModal}/>
        </Modal>
        <Modal
            isOpen={viewBillsModal}
            overlayClassName="overlay-custom"
        >
            <ViewBills closeModal={closeModal}/>
        </Modal>
        </>
    )   
}
export default Documents;
