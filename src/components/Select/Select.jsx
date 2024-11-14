import Select from "react-select";
import "./style.css";

const MySelectComponent = ({ options, handleChange, selectedOption }) => {
  return (
    <div className="my-select-container">
      <Select
        value={selectedOption}
        onChange={(e) => handleChange(e)}
        options={options}
        className="my-select"
        classNamePrefix="react-select"
        placeholder="Add schema to segment"
      />
    </div>
  );
};

export default MySelectComponent;
