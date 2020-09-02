import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SingleSelect from "./singleSelect";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleFormValidation = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};

    if (error !== null) {
      error.details.map((field) => {
        errors[field.path[0]] = field.message;
      });
      return errors;
    }
    return {};
  };

  handleFieldValidation = (name, value) => {
    const fieldObj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    console.log("getting objects", fieldObj, schema, name);
    const { error } = Joi.validate(fieldObj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const { errors } = this.state;
    const errorMessage = this.handleFieldValidation(
      e.currentTarget.name,
      e.currentTarget.value
    );

    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else errors[e.currentTarget.name] = null;

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.handleFormValidation();
    this.setState({ errors });
    console.log("errors", errors);
    if (!_.isEmpty(errors)) return;

    this.doSubmit();
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      ></Input>
    );
  };

  renderSingleSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <SingleSelect
        name={name}
        label={label}
        value={data[name]}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      ></SingleSelect>
    );
  };

  renderButton = (label) => {
    return (
      <button type="submit" className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
