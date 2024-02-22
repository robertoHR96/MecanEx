import React, { useEffect, useState } from "react";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";
import imgPerfil from "../../assets/blank-profile-picture.png";
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
export const Perfil = (props) => {
  const { user, loginUser, logoutUser } = useUsuarioContext();

  const [datosPerfil, setDatosPerfil] = useState({
    id: 0,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    fotPerfil: "",
  });
  const [datosPerfilValid, setDatosPerfilValid] = useState({
    id: false,
    username: false,
    first_name: false,
    last_name: false,
    email: false,
    fotPerfil: false,
  });

  useEffect(() => {
    setDatosPerfil({ ...user });
  }, []);

  return (
    <>
      <div className="perfil">
        <div className="content-miperfil">
          <div className="elemento-info-jugador">
            <div className="title-elemento-info-jugador">
              <div className="">
                {user.fotPerfil === null ? (
                  <img src={imgPerfil} className="fot-perfil" />
                ) : (
                  <div>no hola </div>
                )}
              </div>
            </div>
            <div className="data-perfil">
							{/*
              <div className="">
                <p>
                  <b>ID:</b>
                  {" " + user.id}
                </p>
              </div>
							*/}
              <div className="form-data-perfil">
                <div className="input-form-data-perfil">
                  <label>Username</label>
                  <Input
                    type="text"
                    value={datosPerfil.username}
                    invalid={datosPerfilValid.username}
                    onChange={(e) =>
                      setDatosPerfil({
                        ...datosPerfil,
                        username: e.target.value,
                      })
                    }
                  />
                  <FormFeedback>Este email ya esta en uso</FormFeedback>
                </div>
                <div className="input-form-data-perfil">
                  <label>Nombre</label>
                  <Input
                    type="text"
                    value={datosPerfil.first_name}
                    invalid={datosPerfilValid.first_name}
                    onChange={(e) =>
                      setDatosPerfil({
                        ...datosPerfil,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <FormFeedback>Este email ya esta en uso</FormFeedback>
                <div className="input-form-data-perfil">
                  <label>Apellidos</label>
                  <Input
                    type="email"
                    value={datosPerfil.last_name}
                    invalid={datosPerfilValid.last_name}
                    onChange={(e) =>
                      setDatosPerfil({
                        ...datosPerfil,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <FormFeedback>Este email ya esta en uso</FormFeedback>
                <div className="input-form-data-perfil">
                  <label>email</label>
                  <Input
                    type="email"
                    value={datosPerfil.email}
                    invalid={datosPerfilValid.email}
                    onChange={(e) =>
                      setDatosPerfil({ ...datosPerfil, email: e.target.value })
                    }
                  />
                  <FormFeedback>Este email ya esta en uso</FormFeedback>
                </div>
                <div className="centrador-doble-hor-estric ">
                  <div className="button button-init centrador button-login">
                    <b>Cancelar</b>
                  </div>
                  <div className="button button-init centrador button-juego">
                    <b>Aceptar</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
