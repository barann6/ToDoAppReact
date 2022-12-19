import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

const TaskList = ({ data, onSwitchState, onDelete }) => {
  return (
    <ul className="todo-list">
      {data.map((task) => {
        return (
          <Task
            key={task.id}
            state={task.state}
            id={task.id}
            text={task.text}
            timer={task.timer}
            created={task.created}
            onSwitchState={onSwitchState}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  data: [],
};

TaskList.propTypes = {
  onSwitchState: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TaskList;
