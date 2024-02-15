import React from "react";
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
export const FormRegistro1 = (props) => {
  const {
    dataRegister,
    setDataRegister,
    validRegister,
    setValidRegister,
    years,
    dropdownOpen,
    toggleDropdown,
  } = props;
  return (
    <>
      <label>Nombre</label>
      <Input
        type="text"
        value={dataRegister.first_name}
        invalid={validRegister.first_name}
        onChange={(e) =>
          setDataRegister({ ...dataRegister, first_name: e.target.value })
        }
      />
      <label>Apellidos</label>
      <Input
        type="text"
        value={dataRegister.last_name}
        invalid={validRegister.last_name}
        onChange={(e) =>
          setDataRegister({ ...dataRegister, last_name: e.target.value })
        }
      />
      <div className="centrador-doble-hor">
        <div className="centrador">
          <label>Edad</label>
        </div>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>{dataRegister.edad}</DropdownToggle>
          <DropdownMenu className="content-dropdown">
            {years.map((year) => (
              <DropdownItem
                onClick={() => {
                  setDataRegister({ ...dataRegister, edad: year });
                }}
              >
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};
