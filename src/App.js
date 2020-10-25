import React from 'react'
import TaskList from './taskList'
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
          <div class="add-button" onClick={this.addTask}>+</div>
        </header>
        <div id="main">
          <TaskList 
            tasks={this.state.tasks} app={this}/>
        </div>
      </div>
    );
  }


  addTask() {
    //直接pushしようとするとエラー
    const tasksBuf = this.state.tasks;
    tasksBuf.push({id: (new Date).getTime(), title: "task", description:"desc"});
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

export default App;
