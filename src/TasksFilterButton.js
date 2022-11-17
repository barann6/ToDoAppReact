import React from "react";
import PropTypes from "prop-types";

const TasksFilterButton = ({ text, className, onToggleFilter }) => {
  return (
    <li>
      <button onClick={() => onToggleFilter(text)} className={className}>
        {text}
      </button>
    </li>
  );
};

TasksFilterButton.defaultProps = {
  className: "",
};

TasksFilterButton.propTypes = {
  onToggleFilter: PropTypes.func,
  text: PropTypes.string.isRequired,
};

export default TasksFilterButton;
