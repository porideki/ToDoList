import React, {useState} from 'react';
import Modal from 'react-modal'

class TaskList extends React.Component {
  render() {
    const {app} = this.props;
    const tasks = app.state.tasks
    return (
      tasks.map((task) => {
        return (
          <div class="task-element-edge">
            {this.rendtask(task, app)}
          </div>
        );
      })
    );
  }

  rendtask(task, app) {
    return (
      <TaskElement task={task} app={app}/>
    );
  }

}

function TaskElement(props) {
  var {task, app} = props;
  const tasks = app.state.tasks;
  //タスク操作
  const onClickDelete = (event) => {
    //ボタンの属性からタスクIDを取得
    var target = event.target;
    var id = target.getAttribute("taskid");
    tasks.forEach((element) => {
      //タスクIDが削除対象IDと一致
      if(element.id == id){
        app.delTask(element);
      }
    });
  };

  return (
    <div class="task-element">
      <div class="task-title-desc">
        <h2 class="task-title">{task.title}</h2>
        <p class="task-description">{task.description}</p>
      </div>
      <div class="task-del-button" taskid={task.id} onClick={(event)=>onClickDelete(event)}>x</div>
    </div>
  );
}

export default TaskList;