import { Button, Modal } from "react-bootstrap";
import MainButton from "../MainButton/MainButton";
import { useContext } from "react";
import { ContextFounder } from "../../../contexts/UserConrtrxt";

export default function CategoriesDataModal({
  show,
  onhide,
  register,
  errors,
  onsubmit,
}) {
  const {mood} = useContext(ContextFounder)
  return (
    <>
      <Modal
      className={mood}
        show={show}
        onHide={onhide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            add new category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onsubmit}>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: "name is required" })}
              placeholder="Category Name"         
               
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
            <div className="text-end mt-3 ">
              <MainButton width={"auto"}>Save</MainButton>
              
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
