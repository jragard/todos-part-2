import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';



class TodoItem extends Component {

render() {
    
  return (
    <React.Fragment>
      <li className={this.props.completed ? "completed" : ""} >
        <div className="view">
                        
			<input id={this.props.index} className="toggle" type="checkbox" onChange={this.props.clickMethod}/>
			<label>{this.props.value}</label>
			<button className="destroy" id={this.props.index} onClick={this.props.destroyMethod}></button>
        
		</div>
      </li>
    </React.Fragment>
    );
  }
}

//////////////////////////////////////////////////////////

class TodoList extends Component {

    render() {
      return (

        <React.Fragment>
            <ul className="todo-list">
            {this.props.todos.map( todo => <TodoItem todos={this.props.todos} index={todo.id} key={todo.id} value={todo.title} completed={todo.completed} clickMethod={this.props.clickMethod} destroyMethod={this.props.destroyMethod}/> )}
            </ul>
        </React.Fragment>
    )
  }
}

/////////////////////////////////////////////////////////////

class App extends Component {
  constructor(props) {
    super(props);
    // this.todoCount = this.todoCount.bind(this);
    
    this.state = { todos: todoList, text: ''}
  }

  
 
  // loops through the todos array, if the checkbox target's id matches a particular element's id, this toggles/updates the "completed" state

  clickHandler = (e) => {

    let newArray;
    
    for (let i = 0; i < this.state.todos.length; i++) {
        // eslint-disable-next-line
        if (e.target.id == this.state.todos[i].id) {
            
            newArray = this.state.todos.slice();
            newArray[i].completed = !newArray[i].completed;

            this.setState( {
                "completed": newArray[i].completed
            })
        }
    }
}

  destroyMethod = (e) => {

    let destroyArray;

    for (let i = 0; i < this.state.todos.length; i++) {
        // eslint-disable-next-line 
        if (e.target.id == this.state.todos[i].id) {
            destroyArray = this.state.todos.slice();
            destroyArray.splice(i, 1);
        }
  }
    this.setState(
      {
          todos: destroyArray
      }
  )
}

destroyAll = (e) => {
    let destroyCompletedArray = [];

    for (let i = 0; i < this.state.todos.length; i++) {

        if(!this.state.todos[i].completed) {
            destroyCompletedArray.push(this.state.todos[i])
        }
    }

    this.setState(
        {
            todos: destroyCompletedArray
        }
    )
}


// return this.state.todos.filter(todo => !todo.completed) does the same thing as the below function

 todoCount = () => {
     const todoArray = [];
     for (let i = 0; i < this.state.todos.length; i++) {
        if(!this.state.todos[i].completed) {
            todoArray.push(this.state.todos[i]);
        }
     }
     return todoArray.length;
  }

  



  

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.text.length) {
      return;
    }
    
    this.setState(prevState => (
      {
      todos: [...prevState.todos, {"userId": 1,
                                   "id": this.state.todos.length + 1,
                                   "title": this.state.text,
                                   "completed": false }],
      text: ''
      }
     
      )
    );
      
      let inputField = document.getElementById("input");
      inputField.value = "";
}

  render() { 

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
           <TodoList todos={this.state.todos} clickMethod={this.clickHandler} destroyMethod={this.destroyMethod}/>
        </section>

        <footer className="footer">
          <span className="todo-count"><strong>{this.todoCount()}</strong> item(s) left</span>
          <button onClick={this.destroyAll} className="clear-completed">Clear completed</button>
        </footer>

        
        </section>
      </React.Fragment>
    );
  };
};

export default App;