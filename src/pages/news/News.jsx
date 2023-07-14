import React, { useEffect, useState } from 'react'
import AlertContent, { Alert } from '../../components/Alert';
import Pagination from '../../components/Pagination';
import axiosInstance, { url } from '../../utils/config';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from './AddModal';
import parse from "html-react-parser"
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';


function News() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [elements, setElements] = useState()
    const [data, setData] = useState([])

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState({ isShow: false, item: {} })
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })


    const handlePageClick = (e) => {
        axiosInstance.get(`/news/get-list??page=${e.selected}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        axiosInstance.get(`/news/get-list??page=${e.target[0].value - 1}&size=${size}`)
            .then((res) => {
                setData(res.data.content);
            })
    }

    useEffect(() => {
        axiosInstance.get(`/news/get-list??page=${page}&size=${size}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data.content);
                setElements(res.data.totalElements)
            })
    }, [page, size])

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="d-sm-flex align-items-center justify-content-between">
                        <h2 className="mb-sm-0 font-size-24">Yangiliklar</h2>

                        <div className="page-title-right">
                            <div className="btn btn-primary btn-lg"
                                onClick={() => setAddModal(true)}>
                                Yangi qo'shish
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table className="table table-primary table-bordered align-middle mb-0 table-striped">
                        <thead>
                            <tr className='text-center'>
                                <th>№</th>
                                <th>Media</th>
                                <th>Sarlavha</th>
                                <th>Qisqacha ma'lumot</th>
                                <th>To'liq ma'lumot</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <tr className='text-center table-light' key={index}>
                                            <th>{index + 1}</th>
                                            <td>
                                                {
                                                    !item?.media ? (
                                                        <>
                                                            <a href={`${url}/file/view/${item?.medias[0]}`} target="_blank" rel="noopener noreferrer">
                                                                <img src={`${url}/file/view/${item?.medias[0]}`} className="edit-image"
                                                                    height="200" alt="" />
                                                            </a>
                                                        </>
                                                    ) :
                                                        (
                                                            <>
                                                                <iframe height="200" src={`https://www.youtube.com/embed/${item?.media?.split("=")?.[1]}`} title="bir soniya" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                                            </>
                                                        )
                                                }
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.shortInformation}</td>
                                            <td>{parse(item?.text)}</td>
                                            <td className="text-center">
                                                <AiFillEdit fontSize={"24px"} cursor={"pointer"} color='#71dd37' style={{ margin: "0 8px" }} onClick={() => setEditModal({ isShow: true, item: item })} />
                                                <AiFillDelete fontSize={"24px"} cursor={"pointer"} color='#ff3e1d' onClick={() => setDeleteModal({ isShow: true, id: item.id })} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                    <div className="col-lg-12 mt-2">
                        <Pagination
                            page={page}
                            size={size}
                            elements={elements}
                            handlePageClick={handlePageClick}
                            formSubmit={formSubmit}
                        />
                    </div>
                </div>
            </div>

            {
                addModal && (
                    <AddModal
                        data={data}
                        setData={setData}
                        addModal={addModal}
                        setAddModal={setAddModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {
                editModal.isShow && (
                    <EditModal
                        data={data}
                        setData={setData}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )}
            {
                deleteModal.isShow && (
                    <DeleteModal
                        data={data}
                        setData={setData}
                        deleteModal={deleteModal}
                        setDeleteModal={setDeleteModal}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}

export default News