import React from 'react'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 class="title">ToDo</h1>
          <div class="add-button">+</div>
        </header>
        <div id="main"></div>
      </div>
    );
  }
}

export default App;
