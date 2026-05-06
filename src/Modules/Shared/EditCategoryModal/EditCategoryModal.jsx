import { Button, Modal } from "react-bootstrap";
import MainButton from "../MainButton/MainButton";
import { useForm } from "react-hook-form";
import { API } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";

export default function EditCategoryModal({ show, onhide, categoryId,refresh }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = async (data) => {
        onhide()
    const toastId = toast.loading('editing')
    try{
        
       await API.put(`Category/${categoryId}`,data);
        refresh()
    }
    catch(error){
        toast.error(error?.response?.data?.message || 'something went wrong')
    }
    toast.done(toastId)
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onhide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            update category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onsubmit)}>
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
              <Button className="ms-2" type="button" onClick={onhide}>
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
