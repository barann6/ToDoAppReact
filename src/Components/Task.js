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
      timer: this.props.timer,
      countdown: false,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
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

    this.setState((state) => {
      if (state.countdown && state.timer > 0)
        return {
          timer: state.timer - 1,
        };
    });
  };

  render() {
    let { state, id, text, onSwitchState, onDelete } = this.props;
    let { created, timer } = this.state;
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
            <span className="title">{text}</span>
            <span className="description">
              <label htmlFor="icon-play" className="icon icon-play" />
              <label htmlFor="icon-pause" className="icon icon-pause" />
              <input
                id="icon-play"
                type="radio"
                name="taskTimerToggle"
                style={{ display: "none" }}
                onChange={() => this.setState({ countdown: true })}
              />
              <input
                id="icon-pause"
                type="radio"
                name="taskTimerToggle"
                style={{ display: "none" }}
                onChange={() => this.setState({ countdown: false })}
              />
              " {Math.floor(timer / 60)}:{timer % 60} "
            </span>
            <span className="description">created {created} ago</span>
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
  timer: 0,
};

Task.propTypes = {
  text: PropTypes.string.isRequired,
  timer: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOf(["", "completed"]),
  onSwitchState: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
