import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiWorld, BiMessageDetail, BiNews, BiUser, BiFile,BiMoneyWithdraw } from "react-icons/bi";
import { BsTelegram } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { AiOutlineBarcode, AiOutlineSearch } from "react-icons/ai"
import { GiCommercialAirplane } from "react-icons/gi"
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import './index.css'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Cookies from 'js-cookie';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarsIcon from '@mui/icons-material/Stars';

function Aside() {
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
    const { pathname } = useLocation()
    const [menu, setMenu] = useState(true)

    return (menu && token) ? (
        <aside style={{width:"200px"}} className="menu-vertical menu bg-menu-theme hide">
            <div className="app-brand demo" style={{ height: "130px", display: "flex", justifyContent: "center" }}>
                <Link to="/home" className="app-brand-link">
                    <img src="./images/logo2.png" alt="" />
                </Link>

              
            </div>
            <div className='d-flex justify-content-end mx-3 cursor-pointer' onClick={() => setMenu(prev => !prev)}>
            <AlignHorizontalRightIcon className='' />
            </div>
            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1" style={{width:"200px"}}>
                <li  className={`my-1 menu-item ${pathname === "/Категория" && "active"}`} style={{width:"200px"}}>
                    <Link to="/Категория" className="menu-link">
                        <BookmarkIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Категория</div>
                    </Link>
                </li>
                <li  className={`my-1 menu-item ${pathname === "/Категория" && "active"}`} style={{width:"200px"}}>
                    <Link to="/Подкатегория" className="menu-link">
                        <AutoAwesomeMosaicIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Подкатегория</div>
                    </Link>
                </li>

               

                <li style={{width:"200px"}} className={`my-1 menu-item ${pathname === "/Цветы" && "active"}`}>
                    <Link to="/Цветы" className="menu-link">
                        <FilterVintageIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Цветы</div>
                    </Link>
                </li>

                <li style={{width:"200px"}} className={`my-1 menu-item ${pathname === "/Блог" && "active"}`}>
                    <Link to="/Блог" className="menu-link">
                        <AssignmentIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Блог</div>
                    </Link>
                </li>

                <li style={{width:"200px"}} className={`my-1 menu-item ${pathname === "/Корзина" && "active"}`}>
                    <Link to="/Корзина" className="menu-link">
                        <ShoppingBasketIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Корзина</div>
                    </Link>
                </li>

                <li style={{width:"200px"}} className={`my-1 menu-item ${pathname === "/xitoy_baza" && "active"}`}>
                    <Link to="/Отзывы" className="menu-link">
                        <StarsIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Отзывы</div>
                    </Link>
                </li>
                <li style={{width:"200px"}} className={`my-1 menu-item ${pathname === "/xitoy_baza" && "active"}`}>
                    <Link to="/коммент" className="menu-link">
                        <LocalPostOfficeIcon fontSize={"large"} className='me-2' />
                        <div data-i18n="Analytics">Комментарии</div>
                    </Link>
                </li>
                

            </ul>
        </aside>
    ) : (
        <div className='d-flex justify-content-end cursor-pointer' onClick={() => setMenu(prev => !prev)}>
        <AlignHorizontalLeftIcon className='hidden' />
        </div>
        )
}

export default Aside