import React, { useEffect, useRef, useState } from "react";
// import axiosInstance from '../../utils/config'
import axios from "axios";
import { url } from "../../utils/url";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function AddModal({
  data,
  setData,
  addModal,
  setAddModal,
  Alert,
  setAlert,
  setElements,
  files1,
  setFiles1,
}) {
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const textRef = useRef();
  const textRef2 = useRef();

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [token1, setToken1] = useState(null);
  const [categoryId, setCategoryName] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [subId, setSubId] = useState("");

  const fetchCatData = async () => {
    try {
      const { data } = await axios.get(`${url}/categoriya_base_all_views/`);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCatData();
  }, []);
  const fetchSubData = async () => {
    try {
      const { data } = await axios.get(
        `${url}/categoriya_deteile/${categoryId}/`
      );
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubData();
  }, [categoryId]);
  const addFunc = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      for (let i = 0; i < Object.values(file).length; i++) {
        data.append("img", Object.values(file)[i]);
        console.log(Object.values(file)[i]);
      }

      data.append("name", nameRef.current?.value);
      // data.append("cotent", textRef.current?.value);
      data.append("cotent", text1);
      data.append("price", priceRef.current?.value);
      // data.append("rank", textRef2.current?.value);
      data.append("rank", text2);
      data.append("id_category", Number(categoryId));
      data.append("id_sub_category", subId);

      const token = Cookies.get("token");

      let config = {
        headers: {
          Authorization: JSON.parse(token),
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post(
        `${url}/flowers_base_all_views/`,
        data,
        config
      );
      console.log(res);
      const res2 = await axios.get(`${url}/flowers_base_all_views/`);
      setData(res2?.data?.results);
      setElements(res2?.data?.count);
      toast.success("Добавлено успешно");

      setAddModal(false);
    } catch (error) {
      toast.success(error.message);
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary py-3">
            <h5 className="modal-title text-white">Добавить новость</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAddModal(false)}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={addFunc}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <input
                      className="form-control form-control-lg"
                      ref={nameRef}
                      type="text"
                      placeholder="имя"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <input
                      className="form-control form-control-lg"
                      ref={priceRef}
                      type="text"
                      placeholder="цена"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      onChange={(e) => setCategoryName(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option selected="">категория</option>
                      {category?.map((item) => {
                        return <option value={item.id}>{item.title}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      // ref={subCategoryRef}
                      onChange={(e) => setSubId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option selected="">подкатегория</option>
                      {subCategory?.map((item) => {
                        return <option value={item.id}>{item.title}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mb-3">
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      multiple
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files)}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mb-3">
                    {/* <textarea
                      className="form-control"
                      rows="5"
                      ref={textRef}
                      placeholder="текст"
                    ></textarea> */}
                    <p className="mr-3">Описание</p>
                    <CKEditor
                      editor={ClassicEditor}
                      data={text1}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data);
                        setText1(data);
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    {/* <textarea
                      className="form-control"
                      rows="5"
                      ref={textRef2}
                      placeholder="состав"
                    ></textarea> */}
                    <p>Состав</p>
                    <CKEditor
                      editor={ClassicEditor}
                      data={text2}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data);
                        setText2(data);
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <button
                    className="btn-lg btn btn-primary w-100"
                    type="submit"
                  >
                    Добавлять
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
