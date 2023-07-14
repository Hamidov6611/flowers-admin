import React, { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

const Layout = ({ children,title }) => {
  const [token, setToken] = useState("");
  const getToken = () => {
    const a = Cookies.get("token");
    if (a) {
      const b = JSON.parse(a);
      setToken(b);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Aside />

        <div className="layout-page">
          <Navbar />

          <div className="content-wrapper">
           <Helmet>
           <meta charSet="utf-8" />
            <title>{title}</title>
           </Helmet>
            <div className="container-xxl flex-grow-1 container-p-y">
              {children}
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Букетная-мануфактура"   
};

export default Layout;
