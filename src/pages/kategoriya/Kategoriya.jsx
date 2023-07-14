import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
import Pagination from "../../components/Pagination";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import parse from "html-react-parser";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import axios from "axios";
import { url } from "../../utils/url";
import Cookies from "js-cookie";
import Loader from "../../utils/Loader";


function Kategoriya() {

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

  // const handlePageClick = async (e) => {
  //   // axiosInstance.get(`/categoriya_base_all_views`)
  //   //     .then((res) => {
  //   //         setData(res.data.content);
  //   //     })
  //   const {data} = await axios.get(`${url}/categoriya_base_all_views/`);
  //   setData(data)

  // };
  // useEffect(() => {
  //   handlePageClick()
  // }, []);

  // const formSubmit =async (e) => {
  //   e.preventDefault();
  //   const {data} = await axios.get(`${url}/categoriya_base_all_views/`);
  //   setData(data)
  // };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${url}/categoriya_base_all_views/`);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  // if(data) <Loader />

  useEffect(() => {
    fetchData();
  }, [page, size]);

  return token &&  (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Категория</h2>

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
                <th style={{width:'10%'}}>№</th>
                <th style={{width:'45%'}}>имя категории</th>
                <th style={{width:'25%'}}>статус</th>

                <th style={{width:'20%'}}>/</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
              let a = index+1
                return (
                  <tr className="text-center table-light" key={index}>
                    <th>{a}</th>
                    <th>{item.title}</th>
                    <th><input type="checkbox" checked={item?.status} /></th>
                    <td className="text-center d-flex">
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

export default Kategoriya;
