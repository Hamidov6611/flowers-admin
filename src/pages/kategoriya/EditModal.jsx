import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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
  const [isChecked, setIsChecked] = useState(false);
  console.log(editModal);
  const editFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${url}/categoriya_base_crud_views/${editModal.item.id}/`,
        {
          id: editModal.item.id,
          title: titleRef?.current?.value || "",
          status: isChecked
        }
      );
      console.log(res);
      toast.success("Изменено успешно!");
      const newData = data.filter((item) => {
        if (item.id === editModal.item.id) {
          item.title = res?.data?.title;
          item.status = res?.data?.status
        }

        return item;
      });
      setData(newData);
      setEditModal({ isShow: false, item: {} });
    } catch (error) {
      console.log(error);
    }
  };
const handleCheckBox = () => setIsChecked(prev => !prev)
  // const isCheckedBox = async () =>  {
  //   const {data} = await axios.get(`${url}/forma_deteile_base_all_views/${editModal.item.id}/`)
  //   console.log(data)
  // }
  // useEffect(() => {
  //   isCheckedBox()
  // }, [])

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
                <div className="col-lg-12 d-flex">
                <p className="mx-3">положение</p>
                  <div className="mb-3">
                    <input type="checkbox"  onChange={handleCheckBox}  />
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
