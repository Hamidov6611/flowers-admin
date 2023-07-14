import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContent, { Alert } from "../components/Alert";
import styled from "styled-components";
import { url } from "../utils/url";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Login() {
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const postData = { username, password };
    try {
      // let config = {
      //     headers: {
      //       Authorization: "Bearer " + data.token.accsess,
      //     },
      //   };
      const { data } = await axios.post(
        `${url}/user_sigin_in_views/`,
        postData
      );
      
      if (data) {
        Cookies.set("token", JSON.stringify(`Bearer ${data?.token?.accsess}`));
        toast.success("Авторизация успешна");
        navigate("/Категория");
      } 
      console.log(data?.token?.accsess)
    } catch (error) {
        toast.error("Логин или пароль неверный");
        navigate("/");
      console.log(error);
    }
  };

  return (
    <Wrapper className="p-0">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center pb-0 mb-2">
                <img src="./images/logo.png" alt="" height={"150px"} />
              </div>
              <h4
                className="mb-2 justify-content-center text-center"
                style={{ color: "#152b03", fontWeight: "700" }}
              >
                Добро пожаловать в панель администратора Букетная!
              </h4>
              <form onSubmit={login}>
                <div className="mb-3">
                  <label
                    for="email"
                    className="form-label"
                    style={{ color: "#152b03", fontWeight: "700" }}
                  >
                    Логин
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Введите ваш логин"
                    autofocus
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label
                      className="form-label"
                      for="password"
                      style={{ color: "#152b03", fontWeight: "700" }}
                    >
                      Пароль{" "}
                    </label>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={show ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Введите пароль"
                      aria-describedby="password"
                    />
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => setShow(!show)}
                    >
                      {show ? (
                        <i className="bx bx-show"></i>
                      ) : (
                        <i className="bx bx-hide"></i>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mb-0">
                  <button
                    className="btn btn-primary d-grid w-100 mb-0"
                    type="submit"
                  >
                    Входить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* alert */}
      <AlertContent alert={alert} />
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  .card {
    color: #fff;
  }

  .authentication-wrapper.authentication-basic .authentication-inner:before {
    content: none;
  }
`;
