import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
// import Pagination from "../../components/Pagination";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import axios from "axios";
import { uri, url } from "../../utils/url.js";
import { Pagination } from "@mui/material";
import "./index.css";

function Otziv() {
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [elements, setElements] = useState();
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const [video, setVideo] = useState(false);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isShow: false, item: {} });
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });

  const fetchBlogsData = async () => {
    try {
      const { data } = await axios.get(
        `${url}/flowers_video_commit_base_all_views/?page=${pageId}`
      );
      setPageSize(data?.count)
      setData(data?.results);
      setElements(data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, [pageId]);
  const pages = async () => {
    try {
      const { data } = await axios.get(`${url}/blogs_base_all_views/`);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pages();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Отзывы</h2>

            <div className="page-title-right">
              <div
                className="btn btn-primary btn-lg"
                onClick={() => setAddModal(true)}
              >
                Добавить новое
              </div>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-primary table-bordered align-middle mb-0 table-striped">
            <thead>
              <tr className="text-center">
                <th style={{ width: "5%" }} className="dey text">№</th>
                <th style={{ width: "65%" }} className="text">изображение</th>
                {/* <th style={{ width: "40%" }} className="text">Видео</th> */}
                <th style={{ width: "30%" }} className="dey text">/</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                let a = index + 1;
                return (
                  <tr className="text-center table-light" key={index}>
                    <td className="dey text">{a}</td>
                    <td>
                      <img

                        src={`${uri}${item?.comment}`}
                        alt=""
                        width={"100%"}
                        style={{ margin: "0", padding: "0", objectFit: "cover", }}
                        height={"300px"}
                      />
                    </td>
                    {/* <td>
                      <video  controls width={'100%'} height={"200px"}>
                        <source src={`${uri}${item?.videos}`} type="video/mp4" />
                      </video>
                    </td> */}
                    <td className="text-center dey text" style={{ width: "3%", padding:"0", margin:0 }}>
                      <AiFillEdit
                        fontSize={"24px"}
                        cursor={"pointer"}
                        color="#71dd37"
                        style={{ margin: "0 8px" }}
                        onClick={() =>
                          setEditModal({ isShow: true, item: item })
                        }
                      />
                      <AiFillDelete
                        fontSize={"24px"}
                        cursor={"pointer"}
                        color="#ff3e1d"
                        onClick={() =>
                          setDeleteModal({ isShow: true, id: item.id })
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-around align-items-center py-3">
            <Pagination
              count={Math.floor(pageSize / 10) + 1}
              onChange={(e, value) => setPageId(value)}
              variant="outlined"
              color="primary"
            />
          </div>

          {/* <div className="col-lg-12 mt-2">
            <Pagination
              page={page}
              size={size}
              elements={elements}
              handlePageClick={handlePageClick}
              formSubmit={formSubmit}
            />
          </div> */}
        </div>
      </div>

      {addModal && (
        <AddModal
          data={data}
          setData={setData}
          addModal={addModal}
          setAddModal={setAddModal}
          Alert={Alert}
          setAlert={setAlert}
          setElements={setElements}
        />
      )}

      {editModal.isShow && (
        <EditModal
          data={data}
          setData={setData}
          editModal={editModal}
          setEditModal={setEditModal}
          Alert={Alert}
          setAlert={setAlert}
          setElements={setElements}
        />
      )}
      {deleteModal.isShow && (
        <DeleteModal
          data={data}
          setData={setData}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          Alert={Alert}
          setAlert={setAlert}
          setElements={setElements}
        />
      )}

      {video && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  );
}

export default Otziv;
