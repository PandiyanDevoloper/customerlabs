import React, { useState } from "react";
import "./style.css";
import { MdArrowBackIos } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import Input from "../Input/Input";
import SelectComponent from "../Select/Select";
import { FaWindowMinimize } from "react-icons/fa";
import Button from "../Button/Button";
import axios from "axios";

const SideModal = ({ isOpen, onClose, setaSchemas }) => {
  const [oSegmentDetails, setOSegmentDetails] = useState({
    segment_name: "",
    schema: [{}],
  });

  const options = [
    { value: "first_name ", label: "First Name", type: "user" },
    { value: "last_name", label: "Last Name", type: "user" },
    { value: "gender", label: "Gender", type: "user" },
    { value: "age", label: "Age", type: "user" },
    { value: "account_name", label: "Account Name", type: "user" },
    { value: "city", label: "City  ", type: "group" },
    { value: "State ", label: "State", type: "group" },
  ];

  const deleteSchema = (schema, index) => {
    console.log("index", index);
    const oSegment = JSON.parse(JSON.stringify(oSegmentDetails));
    oSegment.schema.splice(index, 1);
    setOSegmentDetails(oSegment);
  };

  const addNewSchema = () => {
    const oSegment = JSON.parse(JSON.stringify(oSegmentDetails));
    oSegment.schema.push({});
    setOSegmentDetails(oSegment);
  };

  const saveSegment = async () => {
    const oSegment = JSON.parse(JSON.stringify(oSegmentDetails));
    const oPayloadObj = {
      segment_name: oSegment?.segment_name,
    };
    oPayloadObj.schema = oSegment?.schema?.map((schema) => {
      return { [schema?.value]: schema?.label };
    });
    setaSchemas(oPayloadObj);
    console.log("Payload", oPayloadObj);
    try {
      const response = await axios.post(
        "https://webhook.site/4b9c5760-c3ca-43e1-9b11-c3a39469697a",
        oPayloadObj
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const constructOpt = () => {
    const oSegment = JSON.parse(JSON.stringify(oSegmentDetails));
    const aSelectedValues = oSegment.schema?.map((schema) => schema?.value);
    return options?.filter(
      (schema) => !aSelectedValues.includes(schema?.value)
    );
  };
  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className={`side-modal ${isOpen ? "slide-in" : "slide-out"}`}>
        <div className="header_div">
          <div>
            <MdArrowBackIos className="back_icon" />
          </div>
          <p className="header">Saving Segment</p>
        </div>
        <div className="segment_container">
          <div>
            <Input
              name="segment_name"
              value={oSegmentDetails?.segment_name}
              label="Enter the Name of the Segment"
              onChange={(e) => {
                const data = JSON.parse(JSON.stringify(oSegmentDetails));
                data.segment_name = e.target.value;
                setOSegmentDetails(data);
              }}
            />
          </div>
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <div className="traks_cont">
            <div className="tracker_group">
              <div>
                <FaCircle className="green_circle" />
              </div>
              <p>-User Traks</p>
            </div>
            <div className="tracker_group">
              <div>
                <FaCircle className="pink_circle" />
              </div>
              <p>-Group Traks</p>
            </div>
          </div>
          <div className="select_field_cont">
            {oSegmentDetails?.schema?.map((schema, index) => {
              return (
                <div className="select_group">
                  <div>
                    <FaCircle
                      className={
                        schema.type === "user"
                          ? "green_circle"
                          : schema.type === "group"
                          ? "pink_circle"
                          : "transparent_circle"
                      }
                    />
                  </div>
                  <div>
                    <SelectComponent
                      options={constructOpt(index)}
                      selectedOption={
                        schema?.value
                          ? options.find(
                              (option) => option.value === schema.value
                            )
                          : null
                      }
                      handleChange={(e) => {
                        const oSegment = JSON.parse(
                          JSON.stringify(oSegmentDetails)
                        );
                        oSegment.schema[index] = e;
                        setOSegmentDetails(oSegment);
                      }}
                    />
                  </div>
                  <div className="minimus_cont">
                    <FaWindowMinimize
                      className="minimus_icon"
                      onClick={() => deleteSchema(schema, index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="addSchema">
            <a onClick={() => addNewSchema()} className="addLink">
              + Add new schema
            </a>
          </div>
          <div className="footer">
            <div>
              <Button
                variant="primary"
                label="Save the segment"
                onClick={() => saveSegment()}
              />
            </div>
            <div>
              <Button
                variant="cancel"
                label="Cancel"
                onClick={() => onClose(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideModal;
