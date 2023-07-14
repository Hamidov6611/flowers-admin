import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../utils/url";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditModal({
  data,
  setData,
  editModal,
  setEditModal,
  Alert,
  setAlert,
  setElements,
}) {
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const subCategoryRef = useRef();
  const textRef = useRef();

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [flowerImg, setFlowerImg] = useState([])
  const [editorData, setEditorData] = useState("")
  const [text1, setText] = useState("")


  const fetchCatData = async () => {
    const { data } = await axios.get(`${url}/categoriya_base_all_views/`);
    setCategory(data);
  };

  useEffect(() => {
    fetchCatData();
    fetchFlowerData()
    setText(editModal?.item?.rank)
    setEditorData(editModal?.item?.cotent)
  }, []);

  const fetchFlowerData = async () => {
    const {data} = await axios.get(`${url}/flowers_images_post_views/${editModal.item.id}/`)
    setFlowerImg(data[0]?.id_flowers?.flowers)
  }

  const fetchSubData = async () => {
    const { data } = await axios.get(`${url}/sub_categoriya_base_all_views/`);
    setSubCategory(data);
  };

  
  const token = Cookies.get("token");

    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: JSON.parse(token),
      },
    };

  useEffect(() => {
    fetchSubData();
  }, [setData]);

  const editFunc = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

    
        // data.append("img", Object.values(file));
        // axios.put(`${url}flowers_images_post_views/160/`,{img:file, id_flowers: editModal.item[0]?.id_flowers?.id})
  

    data.append("name", nameRef.current?.value);
    data.append("cotent", editorData);
    data.append("price", priceRef.current?.value);
    data.append("rank", text1);
    data.append("id_category", parseInt(categoryRef.current?.value));
    data.append("id_sub_category", parseInt(subCategoryRef.current?.value));

    
    const res = await axios.put(
      `${url}/flowers_base_crud_views/${editModal.item.id}/`,
      data,
      config
    );
    console.log(res.data)
    toast.success("Изменено успешно!");
    const res2 = await axios.get(`${url}/flowers_base_all_views/`)
    setData(res2.data?.results);
    setElements(res2.data?.count);
    setEditModal({ isShow: false, item: {} });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary py-3">
            <h5 className="modal-title text-white">Редактирование</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setEditModal({ isShow: false, item: {} })}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={editFunc}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <input
                      className="form-control form-control-lg"
                      ref={nameRef}
                      type="text"
                      defaultValue={editModal.item.name}
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
                      defaultValue={editModal.item.price}
                      placeholder="цена"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      ref={categoryRef}
                      style={{ height: "50px" }}
                    >
                      <option>категория</option>
                      {category.map((item) => {
                        return (
                          <option
                            value={item.id}
                            selected={
                              item.id === editModal?.item?.id_category?.id
                                ? true
                                : false
                            }
                          >
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      ref={subCategoryRef}
                      style={{ height: "50px" }}
                    >
                      <option>подкатегория</option>
                      {subCategory.map((item) => {
                        return (
                          <option
                            value={item.id}
                            selected={
                              item.id === editModal?.item?.id_sub_category?.id
                                ? true
                                : false
                            }
                          >
                            {item.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* <div className="col-lg-12">
                  <div className="mb-3">
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      multiple
                      onChange={(e) => setFile(e.target.files)}
                    />
                  </div>
                </div> */}

                <div className="col-lg-12">
                  <div className="mb-3">
                    {/* <textarea
                      className="form-control"
                      defaultValue={editModal.item.cotent}
                      rows="5"
                      ref={textRef}
                      placeholder="текст"
                    ></textarea> */}
                    <p>Содержание</p>
                    <CKEditor
                      editor={ClassicEditor}
                      defaultValue={editModal.item.cotent}
                      data={editorData}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data)
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <p>Состав</p>
                  <CKEditor
                      editor={ClassicEditor}
                      defaultValue={editModal?.item?.rank}
                      data={text1}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setText(data)
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn-lg btn btn-primary w-100"
                    type="submit"
                  >
                    Изменять
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

export default EditModal;
