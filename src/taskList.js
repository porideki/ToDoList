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
          <h2 class="task-title">{task.title} {task.id}</h2>
          <p class="task-description">{task.description}</p>
        </div>
        <div class="task-del-button" taskid={task.id} onClick={(event)=>this.onClickDelete(event)}>x</div>
      </div>
    );
  }

  onClickDelete(event) {
    //ボタンの属性からタスクIDを取得
    var target = event.target;
    var id = target.getAttribute("taskid");
    //IDに一致するタスクを削除
    const {tasks, app} = this.props;
    var newTasks = [];
    tasks.forEach((element) => {
      //タスクIDが削除対象IDと一致
      if(element.id == id){
        app.delTask(element);
      }
    });
  }

}

export default TaskList;