import React, { useEffect, useState } from "react";
import AlertContent, { Alert } from "../../components/Alert";
// import Pagination from '../../components/Pagination';
import moment from "moment/moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import axios from "axios";
import { uri, url } from "../../utils/url";
import { Swiper, SwiperSlide } from "swiper/react";
import './index.css'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Korzinka() {
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [elements, setElements] = useState();
  const [data, setData] = useState([]);

  const [addModal, setAddModal] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [editModal, setEditModal] = useState({ isShow: false, item: {} });
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 });

  // const handlePageClick = (e) => {
  //     axiosInstance.get(`/flowers_delivery_base_all_views/?page=${e.target[0].value}`)
  //         .then((res) => {
  //             console.log(res.data);
  //             setData(res.data?.results);
  //             setElements(res.data?.count)
  //         })
  // }

  // const formSubmit = (e) => {
  //     e.preventDefault()
  //     axiosInstance.get(`/flowers_delivery_base_all_views/?page=${e.target[0].value}`)
  //         .then((res) => {
  //             console.log(res.data);
  //             setData(res.data?.results);
  //             setElements(res.data?.count)
  //         })
  // }

  const fetchKorData = async () => {
    const { data } = await axios.get(`${url}/flowers_delivery_base_all_views/`);
    setData(data?.results);
    console.log(data);
    setElements(data?.count);
  };
  console.log(data);
  useEffect(() => {
    fetchKorData();
  }, [page, size]);

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

  return token &&  (
    <>
      <div className="card p-0 m-0">
        <div className="card-header ">
          <div className="d-sm-flex align-items-center justify-content-between">
            <h2 className="mb-sm-0 font-size-24">Корзина</h2>

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

        <div className="card-body w-100 p-0 m-0">
          <table style={{width:'100%', margin:"0 auto"}} className="table p-0 table-primary table-bordered align-middle mb-0 table-striped">
            <thead style={{width:'100%'}}>
              <tr className="text-center">
                <th style={{ width: "3%" }}>№</th>
                
                <th style={{ width: "15%" }} className="hidden">Адрес</th>
                <th style={{ width: "15%" }} className="hidden">Адрес улицы</th>
                <th style={{ width: "10%" }} className="hidden">От</th>
                <th style={{ width: "10%" }} className="hidden">До</th>
                <th style={{ width: "10%" }} className="text">Дата заказа</th>
                <th style={{ width: "10%" }} className="hide1 ">Подробнее</th>
                <th style={{ width: "10%" }} className="hidden ">Номер телефона</th>
                <th style={{ width: "10%" }} className="hidden">Итоговая цена</th>
                
                <th style={{ width: "3%" }}>/</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                let a = index + 1;
                return (
                  <tr className="text-center table-light" key={index}>
                    <th>{a}</th>
                   
                    <td className="hidden">{item?.address_addition}</td>
                    <td className="hidden">{item?.address_street_home}</td>
                    <td className="hidden">{item?.time_delivery}</td>
                    <td className="hidden">{item?.and_time}</td>
                    <td>{item?.date_delivery}</td>
                    <td className="hide1"><Link to={`/Корзина/${item?.id}`} className="btn btn-outline-dark">Видеть</Link></td>
                    <td className="hidden">{item?.phone}</td>
                    <td className="hidden">
                      {item?.prcie} ₽
                    </td>
                    <td className="text-center">
                      {/* <AiFillEdit
                        fontSize={"20px"}
                        cursor={"pointer"}
                        color="#71dd37"
                        style={{ margin: "0 8px" }}
                        onClick={() =>
                          setEditModal({ isShow: true, item: item })
                        }
                      /> */}
                      <AiFillDelete
                      
                        fontSize={"20px"}
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

export default Korzinka;
