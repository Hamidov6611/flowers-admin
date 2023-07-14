import React, { useRef } from 'react'
import axiosInstance from '../../utils/config'

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const titleRef = useRef()

    const editFunc = (e) => {
        e.preventDefault()

        axiosInstance.post(`/news/change`, {
            id: editModal.item.id,
            title: titleRef?.current?.value || "",
        }).then((res) => {
            Alert(setAlert, "success", "Изменено успешно!");

            const newData = data.filter((item) => {
                if (item.id === editModal.item.id) {
                    item.title = res?.data?.title;
                }

                return item
            })

            setData(newData)
            setEditModal({ isShow: false, item: {} })
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Редактирование</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editFunc}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            defaultValue={editModal.item.title}
                                            ref={titleRef} type="text"
                                            placeholder='имя'
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        Изменять
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal