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

export default function Register() {
  const navigate = useNavigate();

  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    password_repit: "",
    first_name: "",
    last_name: "",
    edad: "",
  });

  const [loginValid, setLoginValid] = useState(false);

  const register = () => {};

  return (
    <>
      <div className="centrador content-login">
        <div className="centrador titulo-t1">Registro</div>
        <div class="login-input-text">
          <label>Nombre</label>
          <Input
            type="text"
            value={dataRegister.first_name}
            invalid={loginValid}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, first_name: e.target.value })
            }
          />
          <label>Apellidos</label>
          <Input
            type="text"
            value={dataRegister.last_name}
            invalid={loginValid}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, last: e.target.value })
            }
          />
          <label>Correo electronico</label>
          <Input
            type="email"
            value={dataRegister.email}
            invalid={loginValid}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, email: e.target.value })
            }
          />
          <label>Contraseña</label>
          <Input
            type="password"
            value={dataRegister.password}
            invalid={loginValid}
            onChange={(e) =>
              setDataRegister({ ...dataRegister, password: e.target.value })
            }
          />
          <label>Repiter contraseña</label>
          <Input
            type="password"
            value={dataRegister.password_repit}
            invalid={loginValid}
            onChange={(e) =>
              setDataRegister({
                ...dataRegister,
                password_repit: e.target.value,
              })
            }
          />
          <FormFeedback>Usuario o contraseña no validos</FormFeedback>
          
        </div>
        <br/>
        <div className="botonesLogin">
          <div
            className="button button-init centrador button-login"
            onClick={() => register()}
          >
            <b>Iniciar sesión</b>
          </div>
          <div className="centrador link">Volver login</div>
        </div>
      </div>
    </>
  );
}
