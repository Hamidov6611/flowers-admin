import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { url } from "../../utils/url";
import { toast } from "react-toastify";

function EditModal({
  data,
  setData,
  editModal,
  setEditModal,
  Alert,
  setAlert,
}) {
  const titleRef = useRef();
  const categoryRef = useRef();

  const [category, setCategory] = useState([]);
  const [isChecked, setIsChecked] = useState(false);


  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${url}/categoriya_base_all_views/`);
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const editFunc = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${url}/sub_categoriya_base_crud_views/${editModal.item.id}/`,
        {
          id: editModal.item.id,
          title: titleRef?.current?.value || "",
          status: isChecked
        }
      );

      toast.success("Изменено успешно!");

      const { data } = await axios.get(`${url}/sub_categoriya_base_all_views/`);
      setData(data);
      setEditModal({ isShow: false, item: {} });
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

const handleCheckBox = () => setIsChecked(prev => !prev)


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
                      ref={titleRef}
                      type="text"
                      placeholder="имя"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
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
                              item.id === editModal?.item?.id_categoriya?.id
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
                <div className="col-lg-12 d-flex">
                  <p className="mx-3">положение</p>
                  <div className="mb-3">
                    <input type="checkbox" onChange={handleCheckBox} />
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
