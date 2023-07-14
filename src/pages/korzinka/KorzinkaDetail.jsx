import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../utils/url";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import './index.css'

const KorzinkaDetail = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${url}/flowers_delivery_crud_views/${id}/`
      );
      console.log(data);
      setData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="d-flex flex-column kor">
      <div className="d-flex">
        <p>АДРЕС:</p>
        <span>{data?.address_addition}</span>
      </div>
      <div className="d-flex">
        <p>АДРЕС УЛИЦЫ:</p>
        <span>{data?.address_street_home}</span>
      </div>
      <div className="d-flex">
        <p>ОТ:</p>
        <span>{data?.time_delivery}</span>
      </div>
      <div className="d-flex">
        <p>ДО:</p>
        <span>{data?.and_time}</span>
      </div>
      <div className="d-flex">
        <p>ДАТА ЗАКАЗА:</p>
        <span>{data?.date_delivery}</span>
      </div>
      <div className="d-flex">
        <p>НОМЕР ТЕЛЕФОНА:</p>
        <span>{data?.phone} </span>
      </div>
      <div className="d-flex">
        <p>ИТОГОВАЯ ЦЕНА:</p>
        <span>{data?.prcie}₽</span>
      </div>
      {/* <div>
        {data?.id_flowers?.flowers?.map(item => console.log(item))}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {console.log(item)}
          {item?.flowers?.map((c) => (
            <SwiperSlide>
              <img
                src={` ${`${uri}${c?.img}`} `}
                className="w-full h-[200px] sm:h-[400px] rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
};

export default KorzinkaDetail;
