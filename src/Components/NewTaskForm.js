import React from "react";
import PropTypes from "prop-types";

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      min: "",
      sec: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.value) return;
    this.setState({ value: "", min: "", sec: "" });
    this.props.handleSubmit(
      this.state.value,
      (+this.state.min * 60 || 0) + (+this.state.sec || 0)
    );
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit} className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            value={this.state.min}
            onChange={(e) => this.setState({ min: e.target.value })}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            value={this.state.sec}
            onChange={(e) => this.setState({ sec: e.target.value })}
          />
          <button style={{ display: "none" }}></button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default NewTaskForm;
