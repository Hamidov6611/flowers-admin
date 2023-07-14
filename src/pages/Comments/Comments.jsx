import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
// import Pagination from "../../components/Pagination";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import { uri, url } from "../../utils/url.js";
import { Pagination } from "@mui/material";
import "./index.css";

function Comments() {

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);
  const [video, setVideo] = useState(false);
  const [elements, setElements] = useState();
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });


  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });

  const fetchBlogsData = async () => {
    try {
      const { data } = await axios.get(
        `${url}/forma_get_base_all_views/`
      );
      setData(data?.results);
    //   setElements(data?.count);
      console.log(data)
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

      setPageSize(data?.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    pages();
  }, []);
  console.log(data);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Комментарии</h2>

            {/* <div className="page-title-right">
              <div
                className="btn btn-primary btn-lg"
                onClick={() => setAddModal(true)}
              >
                Добавить новое
              </div>
            </div> */}
          </div>
        </div>

        <div className="card-body">
          <table className="table table-primary table-bordered align-middle mb-0 table-striped">
            <thead>
              <tr className="text-center">
                <th style={{ width: "3%" }} className=" hide1 text">№</th>
                <th style={{ width: "20%" }} className="text">имя </th>
                <th style={{ width: "15%" }} className="text">телефон</th>
                <th style={{ width: "59%" }} className="text">коммент</th>
                <th style={{ width: "3%" }} className="dey text">/</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                let a = index + 1;
                return (
                  <tr className="text-center table-light" key={index}>
                    <td className="dey hide1 text">{a}</td>
                    <td>
                      {item?.full_name}
                    </td>
                    <td>
                     {item?.phone}
                    </td>
                    <td>
                      {item?.content}
                    </td>
                    <td className="text-center dey text" style={{ width: "3%", padding:"0", margin:0 }}>
                     
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

          {/* <div className="d-flex justify-content-around align-items-center py-3">
            <Pagination
              count={Math.floor(pageSize / 10) + 1}
              onChange={(e, value) => setPageId(value)}
              variant="outlined"
              color="primary"
            />
          </div> */}

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

      {/* {video && (
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
      )} */}

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  );
}

export default Comments;
