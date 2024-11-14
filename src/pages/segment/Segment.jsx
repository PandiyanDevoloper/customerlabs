import React, { useState } from "react";
import "./style.css";
import { MdArrowBackIos } from "react-icons/md";
import Button from "../../components/Button/Button";
import SideModal from "../../components/SideModal/SideModal";

const Segment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aSchemas, setaSchemas] = useState([]);
  const showPopUp = () => {
    setIsModalOpen(true);
  };
  const closePopUp = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="header_div">
        <div>
          <MdArrowBackIos className="back_icon" />
        </div>
        <p className="header">Segment List</p>
      </div>
      <div className="segment_button_con">
        <Button
          variant="transparent"
          label="Save segment"
          onClick={() => showPopUp()}
        />
      </div>
      {isModalOpen && (
        <div className="app-container">
          <SideModal
            isOpen={isModalOpen}
            onClose={closePopUp}
            setaSchemas={setaSchemas}
          />
        </div>
      )}
    </>
  );
};

export default Segment;
