import React from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value === '') return;
    this.setState({ value: '' });
    this.props.handleSubmit(this.state.value);
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default NewTaskForm;
