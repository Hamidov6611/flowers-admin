import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { BiNews, BiWorld } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './index.css'

function Navbar() {
  
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(true);

  const search = (event) => {
    if (event.key === "Enter") {
      navigate("/qidiruv", { state: inputRef.current.value });
      inputRef.current.value = "";
    }
  };

  const deleteFunc = () => {
    Cookies.remove("token");
  };
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
  return token && (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <ul className="menu-inner py-1 nav3 ">
          <div className="nav3-child">
            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/Категория" && "active"
              }`}
            >
              <Link to="/Категория" className="menu-link">
                <div data-i18n="Analytics">Категория</div>
              </Link>
            </li>

            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/Подкатегория" && "active"
              }`}
            >
              <Link to="/Подкатегория" className="menu-link">
                <div data-i18n="Analytics">Подкатегория</div>
              </Link>
            </li>

            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/Цветы" && "active"
              }`}
            >
              <Link to="/Цветы" className="menu-link">
                <div data-i18n="Analytics">Цветы</div>
              </Link>
            </li>
          </div>

          <div className="nav3-child">
            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/Блог" && "active"
              }`}
            >
              <Link to="/Блог" className="menu-link">
                <div data-i18n="Analytics">Блог</div>
              </Link>
            </li>

            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/Корзина" && "active"
              }`}
            >
              <Link to="/Корзина" className="menu-link">
                <div data-i18n="Analytics">Корзина</div>
              </Link>
            </li>

            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/xitoy_baza" && "active"
              }`}
            >
              <Link to="/Отзывы" className="menu-link">
                <div data-i18n="Analytics">Отзывы</div>
              </Link>
            </li>
            <li
              className={`my-1 mx-3 menu-item ${
                pathname === "/xitoy_baza" && "active"
              }`}
            >
              <Link to="/коммент" className="menu-link">
                <div data-i18n="Analytics">Комментарии</div>
              </Link>
            </li>
           
          </div>

          {/* <li className={`my-1 mx-3 menu-item ${pathname === "/yangiliklar" && "active"}`}>
                    <Link to="/yangiliklar" className="menu-link">
                        <div data-i18n="Analytics">SEO</div>
                    </Link>
                </li> */}
        </ul>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        {/* <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              ref={inputRef}
              className="form-control border-0 shadow-none"
              placeholder="Поиск..."
              aria-label="Search..."
              onKeyDown={search}
            />
          </div>
        </div> */}

        <ul className="navbar-nav flex-row align-items-center ms-auto ava avamenu">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="/;"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src="../assets/img/avatars/1.png"
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end ">
              <li>
                <a className="dropdown-item " href="/">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1 ">
                      <span className="fw-semibold d-block">Admin</span>
                      <small className="text-muted">администратор</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>

              <li>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={() => deleteFunc()}
                >
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Выход</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
