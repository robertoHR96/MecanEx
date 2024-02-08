import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormFeedback,
} from "reactstrap";

export const Login = () => {
  const navigate = useNavigate();

  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [modalLogin, setModalLogin] = useState(false);
  const [loginValid, setLoginValid] = useState(false);
  /*

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

*/
  const iniciarSesion = () => {
    axios
      .post("http://localhost:8000/auth/login/", {
        email: dataLogin.email,
        password: dataLogin.password,
      })
      .then((response) => {
        loginUser({ ...user, ...response.data });
        navigate("/juegos");
      })
      .catch((error) => {
        setLoginValid(true);
        setDataLogin({ email: "", password: "" });
        console.error(error);
      });
  };

  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });

  return (
    <>
      <div className="centrador content-login">
        <div className="centrador titulo-t1">Login</div>
        <div class="login-input-text">
          <label>Correo electronico</label>
          <Input
            type="email"
            value={dataLogin.email}
            invalid={loginValid}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, email: e.target.value })
            }
          />
          <label>Contraseña</label>
          <Input
            type="password"
            value={dataLogin.password}
            invalid={loginValid}
            onChange={(e) =>
              setDataLogin({ ...dataLogin, password: e.target.value })
            }
          />
          <FormFeedback>Usuario o contraseña no validos</FormFeedback>
          <div className="guardar-contraseña">
            <div className="centrador">
              <input type="checkbox" />
            </div>
            <div className="centrador">
              <label>Recordar contraseña</label>
            </div>
          </div>
        </div>
        <div className="botonesLogin">
          <div
            className="button button-init centrador button-login"
            onClick={() => iniciarSesion()}
          >
            <b>Iniciar sesión</b>
          </div>
          <div className="button button-init centrador button-login">
            <b>Registrarse</b>
          </div>
          <div className="olvidar-contraseña">
            <div className="centrador-line">
              <div className="line" />
            </div>
            <div className="centraodr">ó</div>
            <div className="centrador-line">
              <div className="line" />
            </div>
          </div>
          <div className="centrador link">He olvidado mi contraseña</div>
        </div>
      </div>
      <Modal>
        <ModalHeader></ModalHeader>
      </Modal>
    </>
  );
};