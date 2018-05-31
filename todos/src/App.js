import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';



// class TodoItem extends Component {
//   render() {

    
//     return(
      
//       <h1>{App.state.toDoValue}</h1>



//     )
//   }
// }

class App extends Component {

  state = {
    toDoValue: {},
  }

  buttonClick = (event) => {
    this.setState(
      {toDoValue: document.getElementById("textValue").value
    }
  )
  console.log(this.state)  
  }

  render() { 

    return (
      
      <React.Fragment>
        <div className="header">
          <h1>todos</h1>
          <input id="textValue" value={this.state.value} className="new-todo" placeholder="What needs to be done?" autoFocus/>
          <button className="btn" type="button" onClick={this.buttonClick}>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
