import React, {useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import classes from "./create-photo.css";
import StrapiServiceContext from "../strapi-service-context";
import { connect } from "react-redux";

const CreatePhoto = ({ token, loggedInUser }) => {

    const [photoTitle, setPhotoTitle] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [photoDesc, setPhotoDesc] = useState('');
    const [checkBoxes, setCheckBoxes] = useState([
        {id: 1, label: 'Sport', isCheked: false},
        {id: 2, label: 'Art', isCheked: false},
        {id: 4, label: 'Travel', isCheked: false},
        {id: 5, label: 'Science', isCheked: false},
        {id: 6, label: 'Fashion', isCheked: false},
        {id: 7, label: 'Lifestyle', isCheked: false},
        {id: 8, label: 'Event', isCheked: false},
        {id: 9, label: 'Architecture', isCheked: false},
        {id: 10, label: 'Technology', isCheked: false}
    ]);

    const strapiService = useContext(StrapiServiceContext);

    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const categoryIds = checkBoxes.map(item => {
            if (item.isCheked) {
                return item.id;
            }
        });
        strapiService.createPhoto(photoTitle, photoURL, photoDesc, loggedInUser, token, categoryIds)
            .then(response => {
                console.log(response);
            });
        history.push('/');
    }

    const onTitleChange = (e) => {
        setPhotoTitle(e.target.value);
    }

    const onUrlChange = (e) => {
        setPhotoURL(e.target.value);
    }

    const onDescChange = (e) => {
        setPhotoDesc(e.target.value);
    }

    const checkboxClicked = (id) => {
        setCheckBoxes(prevState => {
            const idx = prevState.findIndex(item => item.id === id);
            const oldItem = prevState[idx];
            const newItem = {...oldItem, isCheked: !oldItem.isChecked};
            return [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
        });
    }

    const renderCheckboxes = checkBoxes.map(item => {
        return (
            <label key={item.id} className="form-check-label">
                <input  className="form-check-input"
                       type="checkbox" onClick={() => checkboxClicked(item.id)}/>
                {item.label}
            </label>
        );
    });

    return (
        <form className={classes['create-form']} onSubmit={onSubmit}>
            <legend>Create Photo</legend>
            <div className="form-group">
                <label htmlFor="inputTitle">Title</label>
                <input type="text" className="form-control" id="inputTitle"
                       placeholder="Enter Title" onChange={onTitleChange}
                       value={photoTitle}/>
            </div>
            <div className="form-group">
                <label htmlFor="inputURL">URL</label>
                <input type="text" className="form-control" id="inputURL"
                       placeholder="Enter URL" onChange={onUrlChange}
                       value={photoURL}/>
            </div>
            <div className="form-group">
                <label htmlFor="descTextarea">Description</label>
                <textarea className="form-control" id="descTextarea" rows="3"
                    style={{marginTop: 0 + 'px', marginBottom: 0 + 'px',  height: 73 + 'px'}}
                onChange={onDescChange} value={photoDesc} placeholder="Enter Description"/>
            </div>
            <div className={classes['checkboxes']}>
                {renderCheckboxes}
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        loggedInUser: state.loggedInUser
    };
}

export default connect(mapStateToProps)(CreatePhoto);
