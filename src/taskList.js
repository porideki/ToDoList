import React from 'react'

class TaskList extends React.Component {
  render() {
    const {tasks} = this.props;
    return (
      tasks.map((task) => {
        return (
          <div class="task-element-edge">
            {this.rendtask(task)}
          </div>
        );
      })
    );
  }

  rendtask(task) {
    return (
      <div class="task-element">
        <div class="task-title-desc">
          <h2 class="task-title">{task.title}</h2>
          <p class="task-description">{task.description}</p>
        </div>
        <div class="task-del-button" taskid={task.id}>x</div>
      </div>
    );
  }
}

export default TaskList;