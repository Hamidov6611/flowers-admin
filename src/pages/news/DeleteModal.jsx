import React from 'react'
import axiosInstance from '../../utils/config';

function DeleteModal({ data, setData, deleteModal, setDeleteModal, Alert, setAlert }) {
    const deleteFunc = (e) => {
        e.preventDefault()
        axiosInstance.delete(`/news/delete-by-id/${deleteModal.id}`).then((res) => {
            const newData = data.filter((item) => item.id !== deleteModal.id)
            Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi!");
            setData(newData)
            setDeleteModal({ isShow: false, id: 0 })
        })
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangilikni o'chirish</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setDeleteModal({ isShow: false, id: 0 })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={deleteFunc}>
                            <h3 className='text-center mb-3'>Haqiqatdan ham ushbu ma'lumotni <br /> o'chirmoqchimisiz?</h3>
                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <button className="btn-lg btn btn-danger w-100" type='submit'>
                                        Ha, Roziman
                                    </button>
                                </div>

                                <div className="col-lg-6">
                                    <button className="btn-lg btn btn-success w-100" type='button'
                                        onClick={() => setDeleteModal({ isShow: false, id: 0 })}>
                                        Bekor qilish
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

export default DeleteModal
