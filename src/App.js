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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {setIsOpenModal(true)};
  const closeModal = () => {setIsOpenModal(false)};
  return (
    <div id="modal-frame">
      <div class="add-button" onClick={openModal}>+</div>
      <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}>
        <h2>Hello, Modal!</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default App;
