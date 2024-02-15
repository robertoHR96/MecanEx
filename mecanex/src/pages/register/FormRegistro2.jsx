import React from 'react'
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
export const FormRegistro2 = (props) => {
      const {
        dataRegister,
        setDataRegister,
        validRegister,
        tooltipOpen,
        toggleTooltip,
      } = props;
  return (
    <>
      <label>Correo electronico</label>
      <Input
        type="email"
        value={dataRegister.email}
        invalid={validRegister.email}
        onChange={(e) =>
          setDataRegister({ ...dataRegister, email: e.target.value })
        }
      />
      <FormFeedback>Este email ya esta en uso</FormFeedback>
      <div className="centrador-doble-hor">
        <div className="centrador">
          <label>Contraseña</label>
        </div>
        <>
          <div id="Tooltip-pass" className="centrador">
            <label>?</label>
          </div>
          <Tooltip
            isOpen={tooltipOpen}
            target="Tooltip-pass"
            toggle={toggleTooltip}
          >
            <p>
              {" "}
              Contraseña requerida: 8 caracteres alfanuméricos con al menos 1
              caracter especial.{" "}
            </p>
          </Tooltip>
        </>
      </div>
      <Input
        type="password"
        value={dataRegister.password}
        invalid={validRegister.password}
        onChange={(e) =>
          setDataRegister({ ...dataRegister, password: e.target.value })
        }
      />
      <FormFeedback>La contraseña no es valida</FormFeedback>
      <label>Repiter contraseña</label>
      <Input
        type="password"
        value={dataRegister.password_repit}
        invalid={validRegister.password_repit}
        onChange={(e) =>
          setDataRegister({
            ...dataRegister,
            password_repit: e.target.value,
          })
        }
      />
      <FormFeedback>Las contraseñas deben coincidir</FormFeedback>
    </>
  );
}
