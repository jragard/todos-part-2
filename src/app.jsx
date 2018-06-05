import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';

class TodoItem extends Component {

  render() {
    const { completed, index, toggleTodo, value, removeItem } = this.props;
    return (
      <React.Fragment>
        <li className={completed ? "completed" : ""} >
          <div className="view">
                        
			  <input id={index} className="toggle" type="checkbox" onChange={toggleTodo}/>
			  <label>{value}</label>
			  <button className="destroy" id={index} onClick={removeItem}></button>
        
	  	    </div>
        </li>
      </React.Fragment>
    );
  }
}

//////////////////////////////////////////////////////////

class TodoList extends Component {
  
  render() {
    const { todos, toggleTodo, removeItem } = this.props;
    return (

      <React.Fragment>
          <ul className="todo-list">
          {todos.map( todo => <TodoItem todos={todos} index={todo.id} key={todo.id} value={todo.title} completed={todo.completed} toggleTodo={toggleTodo} removeItem={removeItem}/> )}
           </ul>
      </React.Fragment>
    )
  }
}

/////////////////////////////////////////////////////////////

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: todoList, text: ''}
  }

// loops through the todos array, if the checkbox target's id matches a particular element's id, this toggles/updates the "completed" state

  toggleTodo = (e) => {
    const { todos } = this.state
    
    for (let i = 0; i < todos.length; i++) {
        // eslint-disable-next-line
        if (e.target.id == todos[i].id) {
            todos[i].completed = !todos[i].completed;
            this.setState( {
                "completed": todos[i].completed
            })
        }
    }
 }

// removes item from the todo List when user clicks the red X button

  removeItem = (e) => {
    const { todos } = this.state
    let removedArray = [];

    for (let i = 0; i < todos.length; i++) {
        // eslint-disable-next-line 
        if (e.target.id != todos[i].id) {
            removedArray.push(todos[i])
        }
  }
    this.setState(
      {
          todos: removedArray
      }
   )
 }

// removes all todo Items marked as complete when user clicks the "clear completed" button

  removeAll = (e) => {
    const { todos } = this.state;
    let completedItems = todos.filter(todo => !todo.completed)
    this.setState(
      {
        todos: completedItems
      }
    )
 }

// changes the "text" state to whatever the user inputs into the field

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

// handles the submit event when user presses enter.  updates state to include user's todo item

  handleSubmit = (e) => {

    const { todos, text} = this.state;
    e.preventDefault();

    if (!text.length) {
      return;
    }
    
    this.setState(prevState => (
      {
      todos: [...prevState.todos, {"userId": 1,
                                   "id": todos.length + 1,
                                   "title": text,
                                   "completed": false }],
      text: ""
      })
    );
      
      let inputField = document.getElementById("input");
      inputField.value = "";
 }

  render() { 
    const { todos } = this.state;
    return (
      <React.Fragment>

        <section className="todoapp">
        
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={this.handleSubmit}>
              <input
                id="input"
                placeholder="What needs to be done?"
                className="new-todo"
                onChange={this.handleChange}
                autoFocus
              />
            </form>
          </header>

          <section className="main">
          <TodoList todos={todos} toggleTodo={this.toggleTodo} removeItem={this.removeItem}/>
          </section>

          <footer className="footer">
            <span className="todo-count"><strong>{todos.filter(todo => !todo.completed).length}</strong> item(s) left</span>
            <button onClick={this.removeAll} className="clear-completed">Clear completed</button>
          </footer>

        
        </section>

      </React.Fragment>
    );
  };
};

export default App;