import React, { useEffect, useState } from "react";
import { API, BASE_URL } from "../../../Constants/axiosClient";
import MainButton from "../../Shared/MainButton/MainButton";
import {  useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
export default function AddRecipe() {
  const [loading, setLoading] = useState(false);
  const [recipeToEdit, setReciprToEdit] = useState(null);
  const { id } = useParams();
  const [fileImage, setFileImage] = useState(null);
  const [sending,setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const removeDuplicateByName = (dataList) => {
    if (!dataList) return;
    const hashMap = {};
    dataList.forEach((item) => {
      hashMap[item.name] = item;
    });
    return Object.values(hashMap);
  };
  const getCategories = async (total = 5, times = 0) => {
    const response = await API.get(`/Category?pageSize=${total}&pageNumber=1`);
    total = response.data.totalNumberOfRecords;
    if (times === 0) {
      const finalResponse = await getCategories(total, 1);
      const noneDuplicate = removeDuplicateByName(finalResponse?.data?.data);
      setCategories(noneDuplicate);
    }
    return response;
  };
  const getTags = async () => {
    const response = await API.get("/tag");
    setTags(response.data);
  };
  const onsubmit = async (data) => {
    setSending(true)
    const toastId = toast.loading("uploading files...");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("price", data.price);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data?.recipeImage[0]);

    try {
      if (!id) {
        const response = await axios.post(
          `${BASE_URL}/api/v1/Recipe`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        toast.done(toastId);
        toast.success(response.data.message || "files uploaded successfully");
        navigate("/dashboard/recipes")
      } else {
        const response = await axios.put(
          `${BASE_URL}/api/v1/Recipe/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        toast.done(toastId);
        toast.success(response.data.message || "files updated successfully");
        navigate("/dashboard/recipes")
      }
    } catch (error) {
      toast.done(toastId);
      setTimeout(
        () => toast.error(error?.response || "uploading failed"),
        1000,
      );
    }
    finally{setSending(false);}
  };
  const getRecipeById = async (id) => {
    try {
      setLoading(true);

      const res = await API.get(`Recipe/${id}`);
      setReciprToEdit(res.data);
      setValue("name", res?.data?.name);
      setValue("price", res?.data?.price);
      setValue("tagId", res?.data?.tag?.id);
      setValue("categoriesIds", res?.data?.category[0]?.id);
      setValue("description", res?.data?.description);
      setValue("description", res?.data?.description);
      const path = res?.data?.imagePath;
      await saveImage(path);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.message || 'some thing went wrong');
      navigate('/dashboard/recipes')
    }
  };
  const saveImage = async (path) => {
    if (!path) {
      return;
    }
    try {
      const response = await axios({
        url: `${BASE_URL}/${path}`,
        method: "GET",
        responseType: "blob", // Crucial: prevents data from being treated as text/JSON
      });
      setValue("recipeImage", [response.data]);
    } catch (e) {
      toast(e?.response?.data?.message || "can not load the image");
    }
  };
  useEffect(() => {
    console.log(fileImage);
    setValue("recipeImage", [fileImage]);
  }, [fileImage]);
  useEffect(() => {
    (() => {
      getCategories();
      getTags();
      if (id) {
        getRecipeById(id);
      }
    })();
  }, []);
  return (
    <>
      <div className="container rounded-4 p-3 ps-4 bg-light-accent my-5">
        <div className="row align-items-center">
          <div className="heading col-md-6">
            <h3>
              Read All <span className="text-accent">Recipes</span>!
            </h3>
            <p className="text-ternary">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-6 text-end">
            <div
              className=" d-inline-block"
              onClick={() => navigate("/dashboard/recipes")}
            >
              <MainButton>
                All Recipes <i className="fa fa-arrow-right"></i>
              </MainButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">

            <LoadingElement />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mb-3">
              <input
                {...register("name", { required: "recipe name is required" })}
                type="text"
                className="form-control"
                placeholder="recipe name"
                defaultValue={recipeToEdit?.name}
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-3">
              <select
                {...register("tagId", { required: "tag name is required" })}
                type="text"
                className="form-control"
                placeholder="tag name"
              >
                <option value={recipeToEdit?.tag?.id || ""}>
                  {recipeToEdit?.tag?.name || "tage name"}
                </option>
                {tags.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              {errors.tagId && (
                <span className="text-danger">{errors.tagId.message}</span>
              )}
            </div>
            <div className="mb-3">
              <input
                {...register("price", { required: "price is required" })}
                type="number"
                className="form-control"
                placeholder="price"
                defaultValue={recipeToEdit?.price}
              />
              {errors.price && (
                <span className="text-danger">{errors.price.message}</span>
              )}
            </div>
            <div className="mb-3">
              <select
                {...register("categoriesIds", {
                  required: "category name is required",
                })}
                type="text"
                className="form-control"
                placeholder="category name"
              >
                <option value={recipeToEdit?.category[0]?.id || ""}>
                  {recipeToEdit?.category[0]?.name || "category name"}
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoriesIds && (
                <span className="text-danger">
                  {errors.categoriesIds.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <textarea
                {...register("description", {
                  required: "description is required",
                })}
                className="form-control"
                placeholder="description"
                defaultValue={recipeToEdit?.description}
              ></textarea>
            </div>
            <div className="mb-3">
              <div className="custom-file-input">
                {(recipeToEdit && recipeToEdit.imagePath) || fileImage ? (
                  <div
                    style={{ width: 100 }}
                    className="position-relative mx-auto"
                  >
                    <img
                      width={100}
                      src={
                        recipeToEdit?.imagePath
                          ? `${BASE_URL}/${recipeToEdit?.imagePath}`
                          : URL.createObjectURL(fileImage)
                      }
                      alt="recipeimage"
                    />
                    <span className="position-absolute start-100 top-0 fs-5 cursor-pointer text-nowrap ">
                      <i
                        className="fa fa-close text-danger"
                        onClick={() => {
                          setValue("recipeImage", [undefined]);
                          setReciprToEdit((p) => ({ ...p, imagePath: "" }));
                          setFileImage(null)
                        }}
                      ></i>
                    </span>
                  </div>
                ) : (
                  <>
                    <h3>
                      <label htmlFor="file-input" className="cursor-pointer">
                        <i className="fa fa-upload text-main"></i>
                      </label>
                    </h3>
                    <p>drag & drop or choose an image to upload</p>
                  </>
                )}
              </div>
              <input
                {...register("recipeImage")}
                type="file"
                accept="image/*"
                id="file-input"
                className="d-none"
                placeholder="recipeImage"
                onChange={(e) => setFileImage(e.target.files[0])}
              />
            </div>
            <div className="text-end">
              <div className="d-inline-block">
                {sending?<LoadingElement/>:
                <MainButton>save</MainButton>
                             }             </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
