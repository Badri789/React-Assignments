import React, {useState} from 'react';
import './item-add-form.css';

const ItemAddForm = ({ onItemAdded }) => {

    const [label, setLabel] = useState('');
    const [selectValue, setSelectValue] = useState('Monday');

    const onLabelChange = (event) => {
        setLabel(event.target.value);
    }

    const onSelectChange = (event) => {
        setSelectValue(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        onItemAdded(label, selectValue);
        setLabel('');
    }

    return (
        <form className="item-add-form d-flex" onSubmit={onSubmit}>
            <select value={selectValue} onChange={onSelectChange} className="form-control">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <input type="text" 
                   className="form-control" 
                   onChange={onLabelChange} 
                   placeholder="What needs to be done?"
                   value={label}/>
            <button className="btn btn-outline-secondary">Add Job</button>
        </form>
    );

}

export default ItemAddForm;