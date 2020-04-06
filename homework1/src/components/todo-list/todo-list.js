import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item'

import './todo-list.css'

const TodoList = ({ todos, onDeleted }) => {

    const iterItems = (jobs, day) => {
        const elements = jobs.map((item) => {
            return (
                <li className="list-group-item"
                    key={item.id}>
                    <TodoListItem 
                        label={item.label} 
                        onDeleted={() => onDeleted(item.id, day)}/>
                </li>
            );
        });

        return elements;
    }

    let mondayJobs, tuesdayJobs, wednesdayJobs, thursdayJobs, fridayJobs, saturdayJobs, sundayJobs;
    mondayJobs = iterItems(todos.Monday, "Monday");
    tuesdayJobs = iterItems(todos.Tuesday, "Tuesday");
    wednesdayJobs = iterItems(todos.Wednesday, "Wednesday");
    thursdayJobs = iterItems(todos.Thursday, "Thursday");
    fridayJobs = iterItems(todos.Friday, "Friday");
    saturdayJobs = iterItems(todos.Saturday, "Saturday");
    sundayJobs = iterItems(todos.Sunday, "Sunday");

    return (
        <div className="todo-list">
            <ul className="list-group">
                <h3>Monday</h3>
                {mondayJobs}
            </ul>
        
            <ul className="list-group">
                <h3>Tuesday</h3>
                {tuesdayJobs}
            </ul>

                    
            <ul className="list-group">
                <h3>Wednesday</h3>
                {wednesdayJobs}
            </ul>
                                
            <ul className="list-group">
                <h3>Thursday</h3>
                {thursdayJobs}
            </ul>

            <ul className="list-group">
                <h3>Friday</h3>
                {fridayJobs}
            </ul>

            <ul className="list-group">
                <h3>Saturday</h3>
                {saturdayJobs}
            </ul>

            <ul className="list-group">
                <h3>Sunday</h3>
                {sundayJobs}
            </ul>
        </div>

    );
}


export default TodoList;


