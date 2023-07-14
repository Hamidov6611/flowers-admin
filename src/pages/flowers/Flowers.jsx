import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
// import Pagination from '../../components/Pagination';
import EditIcon from "@mui/icons-material/Edit";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import axios from "axios";
import { uri, url } from "../../utils/url";
import { Pagination } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import { Pagination } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./index.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Flowers() {
  const [token, setToken] = useState("");
  const getToken = () => {
    const a = Cookies.get("token");
    if (a) {
      const b = JSON.parse(a);
      setToken(b);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const [elements, setElements] = useState();
  const [data, setData] = useState([]);
  const [pageId, setPageId] = useState(1);
  const [pageSize, setPageSize] = useState(Number);
  const [imgData, setImgData] = useState([]);
  const [fullModal, setFullMModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [editModal, setEditModal] = useState({ isShow: false, item: {} });
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });
  const [sveInfo, setSveInfo] = useState(true);
  const [sveIza, setSveIza] = useState(false);
  const [fullData, setFullData] = useState([]);
  const data1 = new FormData();
  const [files, setFiles] = useState([]);
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const izaHandler = () => {
    setSveIza(true);
    setSveInfo(false);
  };
  const infoHandler = () => {
    setSveInfo(true);
    setSveIza(false);
  };

  const pages = async () => {
    try {
      const { data } = await axios.get(`${url}/flowers_base_all_views/`);
      setPageSize(data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pages();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${url}/flowers_base_all_views/?page=${pageId}`
      );

      setData(data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageId]);
  const showImgModal = (item) => {
    setImgData(item?.flowers);
    setImgModal((prev) => !prev);
  };

  const fullHandler = (res) => {
    setFullMModal((prev) => !prev);
    setFullData(res);
  };

  const deleteSelectedImage = async (id) => {
    try {
      await axios.delete(`${url}/flowers_images_post_views/${id}/`);
      // fullData?.flowers?.filter(item => item.id !== id)
      toast.success("Удален успешно");
      fullHandler();
      setFullMModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editSelectedImage = async(arr) => {
    setIsEdit(prev => !prev)
    setEditData(arr)
    console.log(arr)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formData = new FormData();
    formData.append('img', selectedImage);
    formData.append("id_flowers", editData?.id_flowers)
    await axios.put(`${url}/flowers_images_post_views/${editData?.id}/`,formData)
    setFullMModal(false);
  }

  useEffect(() => {
    fetchData();
  }, [fullData]);

  return (
    token && (
      <>
        <div className="card">
          <div className="card-header">
            <div className="d-sm-flex align-items-center justify-content-between">
              <h2 className="mb-sm-0 font-size-24">Цветы</h2>

              <div className="page-title-right">
                <div
                  className="btn btn-primary btn-lg"
                  onClick={() => setAddModal(true)}
                >
                  Добавить новое
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-primary table-bordered align-middle mb-0 table-striped">
              <thead>
                <tr className="text-center">
                  <th style={{ width: "10%" }} className="hide1">№</th>
                  <th style={{ width: "40%" }} className="iza">
                    изображение
                  </th>
                  <th style={{ width: "20%" }} className="hide2">
                    имя
                  </th>
                  <th style={{ width: "15%" }} className="hide2">
                    цена
                  </th>
                  <th style={{ width: "15%" }} className="hide2">
                    имя категории
                  </th>
                  <th className="dey">ДЕЙСТВИЯ</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  let a = index + 1;
                  return (
                    <tr className="text-center table-light" key={index}>
                      <th className="hide1">{a}</th>
                      <td className="d-flex align-items-center justify-content-around">
                        <img
                          src={`${uri}${item.flowers[0]?.img}`}
                          alt=""
                          width={"50%"} height={'200px'} 
                          className="mr-2 iza"
                        />
                      </td>
                      <td className="hide2">{item?.name}</td>
                      <td className="hide2">{item?.price} ₽</td>
                      <td className="hide2">{item?.id_category?.title}</td>
                      <td className="dey">
                        <VisibilityIcon
                          style={{ width: "25%", color:'crimson' }}
                          className="cursor-pointer"
                          onClick={() => fullHandler(item)}
                        />
                        <AiFillEdit
                          style={{ width: "25%", margin: "0 8px" }}
                          fontSize={"24px"}
                          cursor={"pointer"}
                          color="#71dd37"
                          onClick={() =>
                            setEditModal({ isShow: true, item: item })
                          }
                        />
                        <AiFillDelete
                          style={{ width: "25%" }}
                          fontSize={"24px"}
                          cursor={"pointer"}
                          color="#ff3e1d"
                          onClick={() =>
                            setDeleteModal({ isShow: true, id: item.id })
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="d-flex justify-content-around align-items-center py-3">
              <Pagination
                count={Math.floor(pageSize / 10) + 1}
                onChange={(e, value) => setPageId(value)}
                variant="outlined"
                color="primary"
              />
              <p className="mt-3">Всего цветов: {pageSize}</p>
            </div>
          </div>
        </div>

        {addModal && (
          <AddModal
            data={data}
            setData={setData}
            files1={files}
            setFiles1={setFiles}
            addModal={addModal}
            setAddModal={setAddModal}
            Alert={Alert}
            setAlert={setAlert}
            setElements={setElements}
            data1={data1}
          />
        )}

        {editModal.isShow && (
          <EditModal
            fullData={fullData}
            setFullData={setFullData}
            data={data}
            setData={setData}
            editModal={editModal}
            setEditModal={setEditModal}
            Alert={Alert}
            setAlert={setAlert}
            setElements={setElements}
          />
        )}
        {deleteModal.isShow && (
          <DeleteModal
            data={data}
            setData={setData}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            Alert={Alert}
            setAlert={setAlert}
          />
        )}

        {fullModal && (
          <div
            className="modal "
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Настройка изображений
                  </h5>
                  <button
                    onClick={() => setFullMModal(false)}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {!isEdit ? (
                    <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => infoHandler()}
                    >
                      Информация
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => izaHandler()}
                    >
                      ИЗОБРАЖЕНИЕ
                    </button>
                  </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="d-flex">
                      <input 
                      className="form-control w-75 mx-1"
                      type="file"
                      onChange={handleImageUpload}
                      />
                      <button type="submit" className="btn btn-outline-success w-25">изменять</button>
                    </form>
                  )}

                  {sveInfo && (
                    <div className="mt-3">
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Категория</th>
                            <th scope="col">Цена</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>{fullData?.id_category?.title}</td>

                            <td>{fullData?.price} ₽</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sveIza && (
                    <div className="mt-3 d-flex flex-wrap">
                      {fullData?.flowers?.map((c, index) =>
                      (
                        <div
                          key={c?.id}
                          style={{
                            width: "22%",
                            marginRight: "10px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="d-flex justify-content-around ">
                            <button className="btn d-flex text-danger  ">
                              <HighlightOffIcon
                                onClick={() => deleteSelectedImage(c.id)}
                              />
                            </button>
                            <button className="btn d-flex text-success">
                              <EditIcon
                              onClick={() => editSelectedImage(c)}
                              />
                            </button>
                          </div>
                          <img
                            src={`${uri}${c?.img}`}
                            style={{
                              width: "100%",
                              height: "100px",
                              marginRight: "10px",
                              marginBottom: "10px",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* alert */}
        <AlertContent alert={alert} />
      </>
    )
  );
}

export default Flowers;
