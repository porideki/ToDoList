import React, {useState} from 'react';
import Modal from 'react-modal'
//画像
import delIcon from './images/delIcon.png'

//タスク一覧
function TaskList(props) {
    const {app} = props;
    const tasks = app.state.tasks;
    const rendTask = (task, app) => {
      return (
        <TaskElement task={task} app={app}/>
      );
    }

    return (
      tasks.map((task) => {
        return (
          <div class="task-element-edge">
            {rendTask(task, app)}
          </div>
        );
      })
    );
}

//1タスクごとの表示
function TaskElement(props) {
  var {task, app} = props;
  const tasks = app.state.tasks;

  //タスク操作
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  //タスク削除
  const onClickDelete = (event) => {
    //ボタンの属性からタスクIDを取得
    var id = event.target.getAttribute("taskid");
    for(let index = 0; index < tasks.length; index++) {
      //タスクIDが削除対象IDと一致
      if(tasks[index].id == id){
        app.delTask(task);
        break;
      }
    }
  };

  //タスクの編集
  const handleTaskSubmit = (event) => {
    app.editTask(
      task, 
      { //新しいタスク
        id: task.id,
        title:event.target.getAttribute("title"),
        description:event.target.getAttribute("description")
      }
    );
    
    closeModal();
  };

  //モーダル関係
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setIsOpenModal(true)
  };
  const closeModal = () => {setIsOpenModal(false)};

  //表示内容
  return (
    <div class="task-element">
      {/* タスク表示 */}
      <div class="task-title-desc" onClick={openModal}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <img class="button" 
        src={delIcon} width={48} height={48}
        taskid={task.id} onClick={(event)=>onClickDelete(event)}/>
      {/* モーダルウィンドウ */}
      <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}>
        <div class="modal-frame">
          <h3 class="modal-title">Edit Task</h3>
          <div>
            <h4 class="modal-input-title">Task Name:</h4>
            <input class="modal-input" type="text" placeholder="input task title" value={taskTitle} onChange={(event) => {setTaskTitle(event.target.value)}}/>
          </div>
          <div>
            <h4 class="modal-input-title">Description:</h4>
            <input class="modal-input" type="text" placeholder="input task description" value={taskDescription} onChange={(event) => {setTaskDescription(event.target.value)}}/>
          </div>
          <div class="modal-submit">
            <button class="modal-button" onClick={closeModal}>cansel</button>
            <button class="modal-button" onClick={handleTaskSubmit} title={taskTitle} description={taskDescription}>apply</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TaskList;