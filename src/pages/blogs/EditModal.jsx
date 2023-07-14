import React, { useRef, useState, useEffect } from "react";
import axiosInstance from "../../utils/config";
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
  const textRef = useRef();

  const [file, setFile] = useState(null);
  const [editorData, setEditorData] = useState("")

  useEffect(() => {
    setEditorData(editModal?.item?.content)
  }, [])

  console.log(editModal)

  const editFunc = async (e) => {
    e.preventDefault();

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

    let config = {
      headers: {
        Authorization: JSON.parse(token),
      },
    };

    const res = await axios.put(
      `${url}/blogs_base_crud_views/${editModal.item.id}/`,
      data1,
      config
    );
    toast.success("Добавлено успешно");

    const res2 = await axios.get(`${url}/blogs_base_all_views/?page=1`);
    setData(res2?.data?.results);
    setElements(res2?.data?.count);

    setEditModal({ isShow: false, item: {} });
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
                    <input
                      className="form-control form-control-lg"
                      defaultValue={editModal.item.title}
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
                      defaultValue={editModal.item.content}
                      placeholder="текст"
                    ></textarea> */}
                    <CKEditor
                      editor={ClassicEditor}
                      defaultValue={editModal.item.cotent}
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
                      multiple
                      onChange={(e) => setFile(e.target.files)}
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
