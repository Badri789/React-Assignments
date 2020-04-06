import React, {useState} from 'react';
import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list/todo-list';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css'

const App = () => {

    const [todoItems, setTodoItems] = useState({
        Monday: [{label: 'Workout', id: 1}],
        Tuesday: [{label: 'Write awesome ReactJS app', id: 1}],
        Wednesday: [{label: 'Read a book', id: 1}],
        Thursday: [{label: 'Go to market', id: 1}],
        Friday: [{label: 'Learn HTML', id: 1}],
        Saturday: [{label: 'Buy a new laptop', id: 1}],
        Sunday: [{label: 'Write a poem', id: 1}]
    });

    const deleteItem = (id, day) => {
        setTodoItems((todoItemsPrev) => {
            const dayArr = todoItemsPrev[day];
            const idx = dayArr.findIndex((el) => el.id === id);
            const newArray = [...dayArr.slice(0, idx), ...dayArr.slice(idx + 1)];
            return {
                ...todoItemsPrev, [day]: newArray
            }
        });
    }

    const addItem = (text, day) => {
        setTodoItems((todoItemsPrev) => {
            const lastEl = todoItemsPrev[day][todoItemsPrev[day].length - 1];
            let newId;
            if (todoItemsPrev[day].length) {
                newId = lastEl.id + 1;
            } else {
                newId = 1;
            }

            const newArray = [...todoItemsPrev[day], {label: text, id: newId}];

            return {...todoItemsPrev, [day]: newArray};
            
        });
    }

    return (
        <div className="app">
            <AppHeader />
            <ItemAddForm onItemAdded={addItem}/>
            <TodoList 
                todos={todoItems}
                onDeleted={deleteItem}/>
        </div>
    );
}


export default App;