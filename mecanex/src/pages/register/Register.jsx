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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Progress,
} from "reactstrap";
import PropTypes from "prop-types";
import { FormRegistro1 } from "./FormRegistro1";
import { FormRegistro2 } from "./FormRegistro2";

export default function Register() {
  const years = Array.from(
    { length: 2024 - 1900 + 1 },
    (_, index) => 2024 - index
  );

  const navigate = useNavigate();

  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    password_repit: "",
    first_name: "",
    last_name: "",
    edad: 2024,
  });

  const [validRegister, setValidRegister] = useState({
    email: false,
    password: false,
    password_repit: false,
    first_name: false,
    last_name: false,
    edad: false,
  });

  const [progresoRegistro, setProgresoRegistro] = useState(0);

  const [modalFinRegistro, setModalFinRegistro] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    if (dataRegister.password !== dataRegister.password_repit) {
      setValidRegister({ ...visualViewport, password_repit: true });
    } else {
      setValidRegister({ ...visualViewport, password_repit: false });
    }
  }, [dataRegister.password_repit, dataRegister.password]);

  const register = () => {
		setProgresoRegistro(2);
    setModalFinRegistro(!modalFinRegistro);
  };

  const iniciarSesion = () => {};

  const siguiente = () => {
    if (progresoRegistro === 0) {
      setProgresoRegistro(1);
    } else {
      register();
    }
  };

  return (
    <>
      <div className="centrador content-login">
        <div className="centrador titulo-t1">Registro</div>
        <div class="login-input-text">
          {progresoRegistro === 0 ? (
            <FormRegistro2
              dataRegister={dataRegister}
              setDataRegister={setDataRegister}
              validRegister={validRegister}
              setValidRegister={setValidRegister}
              years={years}
              tooltipOpen={tooltipOpen}
              toggleTooltip={toggleTooltip}
            />
          ) : (
            <FormRegistro1
              dataRegister={dataRegister}
              setDataRegister={setDataRegister}
              validRegister={validRegister}
              setValidRegister={setValidRegister}
              years={years}
              dropdownOpen={dropdownOpen}
              toggleDropdown={toggleDropdown}
            />
          )}
        </div>
        <div>
          <div className="centrador-triple-hor">
            <div>0%</div>
            <div>50%</div>
            <div>100%</div>
          </div>
          <Progress
            style={{
              height: "2.23px",
              background: "#d5d5d5",
            }}
            className="barra-progreso"
            value={progresoRegistro * 50}
          />
        </div>
        <br />
        <div className="centrador-doble-hor-estric">
          <div
            className="button button-init centrador button-login"
            onClick={() => iniciarSesion()}
          >
            <b>Iniciar Sesion</b>
          </div>
          <div
            className="button button-init centrador button-juego"
            onClick={() => siguiente()}
          >
            <b>Siguiente</b>
          </div>
        </div>
      </div>
      <Modal isOpen={modalFinRegistro} centered>
        <ModalHeader>¡Genial!</ModalHeader>
        <ModalBody>Tu registro a finalizado con exito</ModalBody>
        <ModalFooter>
          <div
            className="button button-init button-juego"
            onClick={() => {
              setModalFinRegistro(!modalFinRegistro);
              navigate("/juegos");
            }}
          >
						<b>
            	Continuar
						</b>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}
