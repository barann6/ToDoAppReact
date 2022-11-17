import React from "react";
import PropTypes from "prop-types";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: formatDistanceToNow(this.props.created, {
        includeSeconds: true,
      }),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    this.setState({
      created: formatDistanceToNow(this.props.created, {
        includeSeconds: true,
      }),
    });
  };

  render() {
    let { state, id, text, onSwitchState, onDelete } = this.props;
    return (
      <li className={state}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            onChange={() => onSwitchState(id)}
          />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            <span className="created">created {this.state.created} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => onDelete(id)}
          ></button>
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  state: "",
};

Task.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOf(["", "completed"]),
  onSwitchState: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
