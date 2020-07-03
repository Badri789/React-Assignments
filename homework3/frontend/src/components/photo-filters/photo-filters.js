import React, {useState} from "react";
import classes from './photo-filters.css';

const PhotoFilters = ({ onCategoryFilterChange, onDateFilterChange,
                          onRatingFilterChange, onSearch }) => {

    const categories = ['All', 'Sport', 'Art', 'Travel',
        'Science', 'Fashion', 'Lifestyle', 'Event', 'Architecture', 'Technology'];

    const renderCategoryItems = categories.map(item => {
        return <option key={item} value={item.toLowerCase()}>{item}</option>
    });

    const [term, setTerm] = useState('');

    const onCategorySelectChange = (e) => {
        onCategoryFilterChange(e.target.value);
    }

    const onDateSelectChange = (e) => {
        onDateFilterChange(e.target.value);
    }

    const onRatingSelectChange = (e) => {
        onRatingFilterChange(e.target.value);
    }

    const onSearchChange = (e) => {
        const changeInput = e.target.value;
        setTerm(changeInput);
        onSearch(changeInput);
    }

    return (
        <React.Fragment>
            <div className={classes['filters-div']}>
                <select className="custom-select" onChange={onCategorySelectChange}>
                    <option defaultValue="">Sort By Categories</option>
                    {renderCategoryItems}
                </select>

                <select className="custom-select" onChange={onDateSelectChange}>
                    <option defaultValue="">Sort By Date</option>
                    <option value="dateAscending">Date Ascending</option>
                    <option value="dateDescending">Date Descending</option>
                </select>

                <select className="custom-select" onChange={onRatingSelectChange}>
                    <option defaultValue="">Sort by rating</option>
                    <option value="ratingAscending">Rating Ascending</option>
                    <option value="ratingDescending">Rating Descending</option>
                </select>
            </div>
            <div className={classes['search-div']}>
                <input type="text"
                       className="form-control search-input"
                       placeholder="type to search"
                       value={term}
                       onChange={onSearchChange}/>
            </div>

        </React.Fragment>
    );
}

export default PhotoFilters;

