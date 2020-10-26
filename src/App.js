import React, {useState} from 'react';
import TaskList from './taskList';
import Modal from 'react-modal';
import './App.css';

class App extends React.Component {

  state = {
    tasks: []
  }

  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
  }

  render() {
    return (
      <div>
        <header>
          <h1 class="title">ToDo List</h1>
          <CreateTaskButton app={this}/>
        </header>
        <div id="main">
          <TaskList 
            tasks={this.state.tasks} app={this}/>
        </div>
      </div>
    );
  }


  addTask(task) {
    //直接pushしようとするとエラー
    const tasksBuf = this.state.tasks;
    tasksBuf.push(task);
    this.setState({tasks: tasksBuf});
  }

  //タスクの削除
  delTask(task) {
    var newTask = []
    this.state.tasks.forEach((element) => {
      if(element.id != task.id) {
        newTask.push(element);
      }
    });
    this.setState({tasks: newTask});
  }

}

function CreateTaskButton(props) {
  //フォーム関係
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
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
            <input id="task-title-input" type="text" placeholder="input task title" value={taskTitle} onChange={(event) => {setTaskTitle(event.target.value)}}/>
          </div>
          <div>
            <h4>Description</h4>
            <input id="task-description-input" type="text" placeholder="input task description" value={taskDescription} onChange={(event) => {setTaskDescription(event.target.value)}}/>
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
