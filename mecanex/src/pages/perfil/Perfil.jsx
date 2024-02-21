import React, { useEffect, useState } from "react";
import { useUsuarioContext } from "../../context/UsuarioContext";
import axios from "axios";

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

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/Usuarios",
      headers: {
        Authorization: "Bearer " + user.access,
      },
    });
  }, []);

  return <></>;
};
