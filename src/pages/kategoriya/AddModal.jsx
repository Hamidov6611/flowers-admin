import React, { useRef, useState } from "react";
import axios from "axios";
import { url } from "../../utils/url";
import { toast } from "react-toastify";

function AddModal({ data, setData, addModal, setAddModal, Alert, setAlert }) {
  const [title, setTitle] = useState("");

  const addFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/categoriya_base_all_views/`, {
        title,
      });
      toast.success("Добавлено успешно");
      setData([res?.data, ...data]);
      setAddModal(false);
    } catch (error) {
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
                <div className="col-lg-12">
                  <div className="mb-3">
                    <input
                      className="form-control form-control-lg"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      placeholder="имя"
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
