import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
import Pagination from "../../components/Pagination";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import axios from "axios";
import { url } from "../../utils/url";
import './index.css'
import Cookies from "js-cookie";

function SubKategoriya() {
  const [token, setToken] = useState("")
  const getToken = () => {
    const a = Cookies.get("token")
    if(a) {
      const b = JSON.parse(a)
      setToken(b)
    }
  }
  useEffect(() => {
    getToken()
  },[])
  
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [elements, setElements] = useState();
  const [data, setData] = useState([]);

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState({ isShow: false, item: {} });
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });

 

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/sub_categoriya_base_all_views/`);
      setData(res.data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  return token && (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Подкатегория</h2>

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

        <div className="card-body w-100">
          <table className="table table-primary table-bordered align-middle mb-0 table-striped">
            <thead style={{width:"100%"}}>
              <tr className="text-center">
                <th style={{width:"5%"}} className="text hide1">№</th>
                <th style={{width:"40%"}} className="text">имя Подкатегория</th>
                <th style={{width:"30%"}} className="text">имя категории</th>
                <th style={{width:"10%"}} className="text">статус</th>
                
                <th style={{width:"15%"}} className="text">/</th>
              </tr>
            </thead>
            <tbody >
              {data?.map((item, index) => {
              let a = index + 1
                return (
                  <tr className="text-center table-light" style={{width:'100%'}} key={index}>
                    <th style={{width:"5%"}} className="text hide1">{a}</th>
                    <th style={{width:"20%"}} className="text">{item.title}</th>
                    <th style={{width:"20%"}} className="text">{item?.id_categoriya?.title}</th>
                    <th><input type="checkbox" checked={item?.status} /></th>
                    <td style={{width:"15%"}} className="text">
                      <AiFillEdit
                        fontSize={"24px"}
                        className="text"
                        cursor={"pointer"}
                        color="#71dd37"
                        style={{ margin: "0 8px" }}
                        onClick={() =>
                          setEditModal({ isShow: true, item: item })
                        }
                      />
                      <AiFillDelete
                      className="text"
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
        />
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  );
}

export default SubKategoriya;
