import React from "react";
import _ from "lodash";

const SingleSelect = ({ name, label, value, error, options, onChange }) => {
  console.log("getting value", value);

  const defaultValue = _.isEmpty(value) ? "" : value;

  return (
    <div className="form-group">
      <label>{label}</label>
      <select
        className="custom-select custom-select-lg mb-3"
        name={name}
        value={defaultValue}
        onChange={onChange}
      >
        <option></option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SingleSelect;
