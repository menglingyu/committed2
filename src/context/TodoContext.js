import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

export class TodoProvider extends Component {
    state = {
        todos: [],
        todoBeingEdited: null
    }

    todosOperations = {
        addTodo: (todoName) => {

            const randomId = '_' + Math.random().toString(36).substr(2, 9);

            const newTodo = {
                id: randomId,
                name: todoName,
                daysOfWeek: [false, false, false, false, false, false, false],
                completed: false,
                timeCompleted: null,
                render: true,
                dueDate: null
            }

            const newTodos = this.state.todos.slice();
            newTodos.push(newTodo);

            this.setState({
                todos: newTodos
            })

        },
        setTodo: (todoId, newTodoName) => {

            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].name = newTodoName;
                    break;
                }
            }

            this.setState({
                todos
            });

        },
        setTodos: (newTodoArray) => {
            //TODO: assert todo array is of right structure
            this.setState({ todos: newTodoArray });
        },
        setTodoCompleted: (todoId, newIsCompleted) => {

            const { todos } = this.state;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === todoId) {
                    todos[i].completed = newIsCompleted;
                    todos[i].timeCompleted = newIsCompleted ? (new Date()).getTime() : null;
                    break;
                }
            }

            this.setState({
                todos
            });

        },
        deleteTodo: (todoId) => {
            const { todos } = this.state;

            for(let i=0; i<todos.length; i++){
                if(todos[i].id === todoId){
                  todos.splice(i,1);
                  break;
                }
            }

            this.setState({
                todos
            });
        }
    }

    render(){
        return (
            <TodoContext.Provider value={{
                todos: this.state.todos,
                ...this.todosOperations
            }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}