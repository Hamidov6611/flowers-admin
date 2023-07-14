import React, { useRef, useState } from "react";
import axiosInstance from "../../utils/config";
import axios from "axios";
import { url } from "../../utils/url";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
  const textRef = useRef();
  const [fullFlo, setFullFlo] = useState(null);
  const [id1, setId1] = useState("")


  console.log(editModal);
  console.log(data);

  const [file, setFile] = useState();
  const [video, setVideo] = useState();
  const getFullFlowers = async () => {
    const {data} = await axios.get(`${url}/flowers_all_views/`)

    setFullFlo(data)
  }
  useEffect(() => {
    getFullFlowers()
  },[])
  const editFunc = async (e) => {
    e.preventDefault();

    try {
      const data1 = new FormData();

      if (file) {
        for (let i = 0; i < Object.values(file)?.length; i++) {
          data1.append("comment", Object.values(file)[i]);
          console.log(Object.values(file)[i]);
        }
      } 
      // if (video) {
      //   for (let i = 0; i < Object.values(video).length; i++) {
      //     data1.append("videos", Object.values(video)[i]);
      //   }
      // }

      const token = Cookies.get("token");

      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      };

      const res = await axios.put(
        `${url}/flowers_video_commit_crud_views/${editModal.item.id}/`,
        data1,
        config
      );
      

      const a = await axios.get(
        `${url}/flowers_video_commit_base_all_views/`
      );
      setData(a?.data?.results);
      setElements(a?.data?.count);

      setEditModal({ isShow: false, item: {} });
      toast.success("Изменено успешно");
    } catch (error) {
      console.log(error);
      toast.error("Error");
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
                <div className="col-lg-12">
                  <div className="mb-3">
                  {/* <select
                      className="form-select"
                      onChange={(e) => setId1(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option>категория</option>
                      {fullFlo?.map((item) => {
                        return (
                          <option
                            value={item.id}
                            selected={
                              item.id === editModal?.item?.id_category?.id
                                ? true
                                : false
                            }
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select> */}
                    <p className="my-1 p-0">ИЗОБРАЖЕНИЕ</p>
                    <input
                      type="file"
                      id="files"
                      className="form-control mb-3"
                      name="files"
                      onChange={(e) => setFile(e.target.files)}
                    />
                    {/* <p className="my-1 p-0">ВИДЕО</p>
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      onChange={(e) => setVideo(e.target.files)}
                    /> */}
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
