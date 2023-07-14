import React, { useRef, useState } from "react";
import axiosInstance from "../../utils/config";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../utils/url";
import Cookies from "js-cookie";
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
}) {
  const nameRef = useRef();
  const textRef = useRef();

  const [file, setFile] = useState(null);
  const [editorData, setEditorData] = useState('');

  

  const addFunc = async (e) => {
    e.preventDefault();

    try {
      const data1 = new FormData();

      if (file) {
        for (let i = 0; i < Object.values(file)?.length; i++) {
          data1.append("img", Object.values(file)[i]);
          console.log(Object.values(file)[i]);
        }
      }

      data1.append("title", nameRef.current?.value);
      data1.append("content", editorData);

      const token = Cookies.get("token");
      console.log(token);

      let config = {
        headers: {
          Authorization: JSON.parse(token),
        },
      };

      const res2 = await axios.post(
        `${url}/blogs_base_all_views/`,
        data1,
        config
      );
      toast.success("Добавлено успешно!");
      setData([res2.data, ...data]);

      setElements(res2?.data?.count);
      setAddModal(false);
    } catch (error) {
      toast.success(error.message);
      console.log(error);
    }

    // axiosInstance.post(`/categoriya_base_all_views/`, {
    //     title: titleRef.current?.value
    // }).then((res) => {
    //     Alert(setAlert, "success", "Добавлено успешно");
    //     setData([res.data, ...data])
    //     setAddModal(false)
    // })
  };

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content w-100">
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
                    <input
                      className="form-control form-control-lg"
                      ref={nameRef}
                      type="text"
                      placeholder="заголовок"
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
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data)
                        setEditorData(data)
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="mb-3">
                    <input
                      type="file"
                      id="files"
                      className="form-control"
                      name="files"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files)}
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
