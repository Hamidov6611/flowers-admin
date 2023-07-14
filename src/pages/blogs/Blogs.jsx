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
import './blog.css'


function Blogs() {
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [elements, setElements] = useState();
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(Number);
  const [pageId, setPageId] = useState(1);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isShow: false, item: {} });
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });

//   const handlePageClick = (e) => {
//     axiosInstance
//       .get(`/blogs_base_all_views/?page=${e.slected + 1}`)
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data?.results);
//         setElements(res.data?.count);
//       });
//   };

//   const formSubmit = (e) => {
//     e.preventDefault();
//     axiosInstance
//       .get(`/blogs_base_all_views/?page=${e.target[0].value}`)
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data?.results);
//         setElements(res.data?.count);
//       });
//   };

  const fetchBlogsData = async () => {
    const { data } = await axios.get(`${url}/blogs_base_all_views/?page=${pageId}`);
    setData(data?.results);
    setElements(data?.count);
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
  console.log(pageSize)

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Блог</h2>

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
                <th style={{ width: "10%" }}>№</th>
                <th style={{ width: "40%" }} className="iza">изображение</th>
                <th style={{ width: "20%" }} className="hide2">заголовок</th>
                <th style={{ width: "15%" }} className="hide2">содержание</th>
                <th className="dey">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
              let a = index + 1
                return (
                  <tr className="text-center table-light" key={index}>
                    <th>{a}</th>
                    <td className="iza">
                      <img src={`${uri}${item.img}`} alt="" width={"50%"} height={'200px'} />
                    </td>
                    <td className="hide2">{item?.title}</td>
                    <td className="hide2"  dangerouslySetInnerHTML={{
                        __html: (item?.content?.slice(0,100) )
                      }} />
                    {/* {item?.content?.slice(0,100)}{item?.content?.length > 100 && '...'} */}
                    <td className="text-center dey">
                      
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
            <p className="mt-3">Всего блог: {pageSize}</p>
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

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  );
}

export default Blogs;
