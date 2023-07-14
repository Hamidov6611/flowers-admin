import React, { useCallback, useRef, useState } from 'react'
import axiosInstance, { url } from '../../utils/config'
import CkeEditor from '../../components/ckeEditor/CkeEditor';
import axios from 'axios';

function EditModal({ data, setData, editModal, setEditModal, Alert, setAlert }) {
    const urlRef = useRef()
    const titleRef = useRef()
    const shortRef = useRef()

    const [newsData, setNewsData] = useState("");
    const [file, setFile] = useState(null)

    const addFunc = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("request", file);

        const token = localStorage.getItem('token');
        let fileId = ""

        try {
            const res = await axios.post(`${url}/file/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": token ? `Bearer ${token}` : ''
                }
            })
            fileId = res.data
        } catch {
            console.log("xatooo");
        }


        try {
            console.log({
                "medias": [
                    fileId
                ],
                "title": titleRef?.current?.value || "",
                "text": newsData,
                "media": urlRef?.current?.value || "",
                "shortInformation": shortRef?.current?.value || ""
            });
            if (fileId || urlRef) {
                await axiosInstance.post(`/news/change`, {
                    "medias": [
                        fileId
                    ],
                    "title": titleRef?.current?.value || "",
                    "text": newsData,
                    "media": urlRef?.current?.value || "",
                    "shortInformation": shortRef?.current?.value || ""
                }).then((res) => {
                    Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi");

                    const newData = data.filter((item) => {
                        if (item.id === editModal.item.id) {
                            item.title = res?.data?.title;
                            item.text = res?.data?.text;
                            item.media = res?.data?.media;
                            item.shortInformation = res?.data?.shortInformation;
                            item.medias = res?.data?.medias;
                        }

                        return item
                    })

                    setData(newData)
                    setEditModal({ isShow: false, item: {} })
                })
            }
        } catch {
            console.log("xatooo");
        }
    }

    const handleFunction = useCallback(
        (event, editor) => {
            setNewsData(String(event?.editor?.getData()));
        },
        [setNewsData]
    );

    const changeFile = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0]);
    }

    return (
        <div className="modal">
            <div className="modal-dialog-centered" style={{ width: "70%", margin: "0 auto" }}>
                <div className="modal-content" >
                    <div className="modal-header bg-primary py-3">
                        <h5 className="modal-title text-white">Yangilikni tahrirlash</h5>
                        <button type="button" className="btn-close"
                            onClick={() => setEditModal({ isShow: false, item: {} })}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addFunc}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={urlRef} type="url"
                                            placeholder='Media url'
                                            defaultValue={editModal.item?.media}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="input-group mb-3">
                                        <input type="file"
                                            className="form-control form-control-lg"
                                            accept="image/*"
                                            title='pasport orqa rasmi'
                                            onChange={(e) => changeFile(e)}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input className="form-control form-control-lg"
                                            ref={titleRef} type="text"
                                            placeholder='Sarlavha'
                                            defaultValue={editModal.item?.title}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <textarea className="form-control" maxLength={300}
                                            ref={shortRef}
                                            defaultValue={editModal.item?.shortInformation}
                                            id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <div className="templateCkeditor">
                                            <CkeEditor handleFunction={handleFunction} initData={editModal.item?.fullInformation} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <button className="btn-lg btn btn-primary w-100" type='submit'>
                                        Qo'shish
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