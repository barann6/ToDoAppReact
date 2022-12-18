import React from "react";

import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";
import Footer from "./Footer";

let ids = 9;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: "All",
    };
    this.toggleState = this.toggleState.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.leftTask = this.leftTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  clearCompleted() {
    this.setState(({ data }) => {
      const arr = data.filter((element) => element.state !== "completed");
      return {
        data: arr,
      };
    });
  }

  toggleState(id) {
    this.setState(({ data }) => {
      const arr = data.map((el) =>
        el.id === id ? { ...el, state: el.state ? "" : "completed" } : { ...el }
      );
      return {
        data: arr,
      };
    });
  }

  deleteTask(id) {
    this.setState(({ data }) => {
      const arr = data.filter(el => el.id !== id);
      return {
        data: arr,
      };
    });
  }

  leftTasks(data) {
    return data.reduce((count, el) => {
      if (!el.state) ++count;
      return count;
    }, 0);
  }

  addTask(text) {
    this.setState(({ data }) => {
      return {
        data: [...data, { text, state: "", created: new Date(), id: ++ids }],
      };
    });
  }

  toggleFilter(filter) {
    this.setState({ filter });
  }

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm handleSubmit={this.addTask} />
        <section className="main">
          <TaskList
            data={(() => {
              switch (this.state.filter) {
                case "All":
                  return this.state.data;
                case "Active":
                  return this.state.data.filter(
                    (element) => element.state === ""
                  );
                case "Completed":
                  return this.state.data.filter(
                    (element) => element.state === "completed"
                  );
                default:
                  return this.state.data;
              }
            })()}
            onSwitchState={this.toggleState}
            onDelete={this.deleteTask}
          />
          <Footer
            taskLeft={this.leftTasks(this.state.data)}
            filter={this.state.filter}
            onToggleFilter={this.toggleFilter}
            onClearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
