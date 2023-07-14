import React, { useEffect, useRef, useState } from "react";
// import axiosInstance from '../../utils/config'
import axios from "axios";
import { url } from "../../utils/url";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

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

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [file, setFile] = useState('');
  const [file2, setFile2] = useState('');
  const [fullFlo, setFullFlo] = useState(null);
  const [id1, setId1] = useState("")

  const fetchCatData = async () => {
    try {
      const { data } = await axios.get(`${url}/categoriya_base_all_views/`);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getFullFlowers = async () => {
    const {data} = await axios.get(`${url}/flowers_all_views/`)

    setFullFlo(data)
  }

  useEffect(() => {
    fetchCatData();
    getFullFlowers()
  }, []);
  const fetchSubData = async () => {
    try {
      const { data } = await axios.get(`${url}/sub_categoriya_base_all_views/`);
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubData();
  }, [setData]);

  const addFunc = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

    // for (let i = 0; i < Object.values(file).length; i++) {
    //   data.append("comment", Object.values(file)[i]);
    //   console.log(Object.values(file)[i]);
    // }
    // for (let i = 0; i < Object.values(file2).length; i++) {
    //    data.append("videos", Object.values(file2)[i])
    //   console.log(Object.values(file2)[i]);
    // }

    data.append("id_flowers", id1);
    data.append("comment", file)
    // data.append("videos", file2)

    console.log(data);

    const token = Cookies.get("token");

    let config = {
      headers: {
        Authorization: JSON.parse(token),
      },
    };

    const res = await axios.post(
      `${url}/flowers_video_commit_base_all_views/`,
      data,
      config
    );
    const res2 = await axios.get(
      `${url}/flowers_video_commit_base_all_views/`
    );
    console.log(res2)
    setData(res2?.data?.results);
    setElements(res2?.data?.count);
    toast.success("Добавлено успешно");
    setAddModal(false);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };


  // const trashFile = (index) => {
  //     if (file?.length > 0) {
  //         let arr = file.filter((f, i) => i !== index);
  //         setFile(arr);
  //     }
  // };
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
                <div className="col-lg-12">
                  <div className="mb-3">
                    <select
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
                              item.id === addModal?.item?.id_category?.id
                                ? true
                                : false
                            }
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                

                <div className="col-lg-12">
                  <div className="mb-3">
                  <label>ИЗОБРАЖЕНИЕ</label>
                    
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
                {/* 
                <div className="col-lg-12">
                  <div className="mb-3">
                  <label>Видео</label>
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      onChange={(e) => setFile2(e.target.files[0])}
                    />
                  </div>
                </div> */}

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
