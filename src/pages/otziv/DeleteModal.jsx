import React from 'react'
import axiosInstance from '../../utils/config';
import { url } from '../../utils/url';
import { toast } from 'react-toastify';
import axios from 'axios';

function DeleteModal({ data, setData, deleteModal, setDeleteModal, Alert, setAlert }) {
    const deleteFunc = async (e) => {
        e.preventDefault()

        await axios.delete(`${url}/flowers_video_commit_crud_views/${deleteModal.id}/`)

        // axiosInstance.delete(`${url}/flowers_video_commit_crud_views/${deleteModal.id}/`).then((res) => {
        //     const newData = data?.results?.filter((item) => item.id != deleteModal.id)
        //     toast.success("Удален успешно!")
        //     setData(newData)
        //     setDeleteModal({ isShow: false, id: 0 })
            
        // })
        const { data } = await axios.get(
            `${url}/flowers_video_commit_base_all_views/`
          );
          setData(data?.results);
        setDeleteModal({ isShow: false, id: 0 })

    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Удалить</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setDeleteModal({ isShow: false, id: 0 })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={deleteFunc}>
                            <h3 className='text-center mb-3'>Вы уверены, что хотите удалить эту информацию?</h3>
                            <div className="row">
                                <div className="col-lg-6 mb-2">
                                    <button className="btn-lg btn btn-danger w-100" type='submit'>
                                        Да, я согласен
                                    </button>
                                </div>

                                <div className="col-lg-6">
                                    <button className="btn-lg btn btn-success w-100" type='button'
                                        onClick={() => setDeleteModal({ isShow: false, id: 0 })}>
                                        Отмена
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
