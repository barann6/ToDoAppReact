import React from "react";
import PropTypes from "prop-types";
import TasksFilterButton from "./TasksFilterButton";

const TasksFilter = ({ filter, onToggleFilter }) => {
  return (
    <ul className="filters">
      <TasksFilterButton
        className={filter === "All" ? "selected" : ""}
        onToggleFilter={onToggleFilter}
        text="All"
      />
      <TasksFilterButton
        className={filter === "Active" ? "selected" : ""}
        onToggleFilter={onToggleFilter}
        text="Active"
      />
      <TasksFilterButton
        className={filter === "Completed" ? "selected" : ""}
        onToggleFilter={onToggleFilter}
        text="Completed"
      />
    </ul>
  );
};

TasksFilter.defaultProps = {
  filter: "All",
};

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(["All", "Active", "Completed"]),
  onToggleFilter: PropTypes.func,
};

export default TasksFilter;
