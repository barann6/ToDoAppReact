import React, { useState, useEffect, useCallback, useMemo } from 'react';

import NewTaskForm from './NewTaskForm';
import TaskList from './TaskList';
import Footer from './Footer';
import Context from './Сontext';

let ids = 0;

const App = () => {
  const [data, setData] = useState([]);
  const [currentFilter, setcurrentFilter] = useState('All');

  const tick = useCallback(() => {
    setData((prevData) =>
      prevData.map((el) =>
        el.going && el.time ? { ...el, time: el.time - 1 } : { ...el }
      )
    );
  }, []);
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  const addTask = (text, time) =>
    setData((prevData) => [
      ...prevData,
      {
        text,
        state: '',
        created: new Date(),
        id: ++ids,
        time,
        going: false,
      },
    ]);
  const displayData = () => {
    switch (currentFilter) {
      case 'All':
        return data;
      case 'Active':
        return data.filter((element) => element.state === '');
      case 'Completed':
        return data.filter((element) => element.state === 'completed');
      default:
        return data;
    }
  };
  const tasksLeft = () =>
    data.reduce((count, el) => (!el.state ? ++count : count), 0);
  const clearCompletedTasks = () =>
    setData((prevData) =>
      prevData.filter((element) => element.state !== 'completed')
    );

  const switchTaskState = (id) =>
    setData((prevData) =>
      prevData.map((el) =>
        el.id === id ? { ...el, state: el.state ? '' : 'completed' } : { ...el }
      )
    );
  const switchTaskTimer = (id, state) =>
    setData((prevData) =>
      prevData.map((el) => (el.id === id ? { ...el, going: state } : { ...el }))
    );
  const deleteTask = (id) =>
    setData((prevData) => prevData.filter((el) => el.id !== id));
  const toggleTasksFilter = (filter) => setcurrentFilter(filter);

  const taskControls = useMemo(() => {
    return {
      switchTaskState,
      switchTaskTimer,
      deleteTask,
    };
  }, []);
  const filterControls = useMemo(() => {
    return { toggleTasksFilter, currentFilter };
  }, [currentFilter]);

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <Context.Provider value={taskControls}>
          <TaskList data={displayData()} />
        </Context.Provider>
        <Context.Provider value={filterControls}>
          <Footer
            tasksLeft={tasksLeft()}
            clearCompletedTasks={clearCompletedTasks}
          />
        </Context.Provider>
      </section>
    </section>
  );
};

export default App;
