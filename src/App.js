import React, {useState} from 'react';
import Modal from 'react-modal';
import TaskList from './taskList';
import './App.css';

class App extends React.Component {

  state = {
    tasks: []
  }

  //表示内容
  render() {
    return (
      <div>
        <header>
          <h1 class="title">ToDo List</h1>
          <CreateTaskButton app={this}/>
        </header>
        <div id="main">
          <TaskList app={this}/>
        </div>
      </div>
    );
  }

  //タスクの追加
  addTask(task) {
    const tasksBuf = this.state.tasks;
    tasksBuf.push(task);
    this.setState({tasks: tasksBuf});
  }

  //タスクの削除
  delTask(task) {
    var newTasks = []
    this.state.tasks.forEach((element) => {
      if(element.id != task.id) {
        newTasks.push(element);
      }
    });
    this.setState({tasks: newTasks});
  }

  //タスクの編集(編集前タスク, 編集後タスク)
  editTask(oldTask, newTask) {
    const tasksBuf = this.state.tasks;
    //編集前タスクのインデクスを取得
    var taskIndex = 0;
    for(let index=0; index < tasksBuf.length; index++){
      if(tasksBuf[index].id == oldTask.id){
        taskIndex = index;
        break;
      }
    }
    //編集後タスクで上書きして反映
    tasksBuf[taskIndex] = newTask;
    this.setState({tasks: tasksBuf});
  }

}

//タスクの作成
function CreateTaskButton(props) {
  //フォーム関係
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  //タスクを作成して追加
  const handleTaskSubmit = (event) => {
    const {app} = props;
    app.addTask({
      id:(new Date()).getTime(), 
      title:event.target.getAttribute("title"), 
      description:event.target.getAttribute("description")
    });
    closeModal();
  }

  //モーダル関係
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setTaskTitle("");
    setTaskDescription("");
    setIsOpenModal(true)
  };
  const closeModal = () => {setIsOpenModal(false)};

  //表示内容
  return (
    <div>
      {/* 通常の表示 */}
      <div class="add-button" onClick={openModal}>+</div>
      {/* モーダルウィンドウ */}
      <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}>
          <h3>New Task</h3>
          <div>
            <h4>Task Name</h4>
            <input type="text" placeholder="input task title" value={taskTitle} onChange={(event) => {setTaskTitle(event.target.value)}}/>
          </div>
          <div>
            <h4>Description</h4>
            <input type="text" placeholder="input task description" value={taskDescription} onChange={(event) => {setTaskDescription(event.target.value)}}/>
          </div>
          <div>
            <button onClick={closeModal}>cansel</button>
            <button onClick={handleTaskSubmit} title={taskTitle} description={taskDescription}>add</button>
          </div>
      </Modal>
    </div>
  );
}

export default App;
