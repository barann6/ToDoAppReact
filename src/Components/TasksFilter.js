import React from 'react';
import PropTypes from 'prop-types';
import TasksFilterButton from './TasksFilterButton';

const TasksFilter = ({ filter, onToggleFilter }) => {
  return (
    <ul className="filters">
      <li>
        <TasksFilterButton
          className={filter === 'All' ? 'selected' : ''}
          onToggleFilter={onToggleFilter}
          value="All"
        />
      </li>
      <li>
        <TasksFilterButton
          className={filter === 'Active' ? 'selected' : ''}
          onToggleFilter={onToggleFilter}
          value="Active"
        />
      </li>
      <li>
        <TasksFilterButton
          className={filter === 'Completed' ? 'selected' : ''}
          onToggleFilter={onToggleFilter}
          value="Completed"
        />
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  filter: 'All',
};

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onToggleFilter: PropTypes.func,
};

export default TasksFilter;
