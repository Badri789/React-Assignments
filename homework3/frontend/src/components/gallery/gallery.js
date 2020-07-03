import React, {useContext, useEffect, useState} from "react";
import classes from "./gallery.css";
import StrapiServiceContext from "../strapi-service-context";
import {photosLoaded} from "../../actions";
import PhotoFilters from "../photo-filters";
import {connect} from "react-redux";

const Gallery = ({ token, photos, photosLoaded, loggedInUserId }) => {

    const [categoryFilter, setCategoryFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('dateDescending');
    const [ratingFilter, setRatingFilter] = useState(null);
    const [term, setTerm] = useState('');

    const onSearch = (changeInput) => {
        setTerm(changeInput);
    }

    const search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    const onCategoryFilterChange = (filter) => {
        setCategoryFilter(filter);
    }

    const filterCategoryField = (items, filter) => {
        return items.filter(item => {
            const categories = item.categories.map(item => {
                return item.name
            });
            return categories.includes(filter);
        });
    }

    const filterPhotosByCategory = (items, filter) => {
        switch(filter) {
            case 'all':
                return items;
            case 'sport':
                return filterCategoryField(items, 'sport');
            case 'art':
                return filterCategoryField(items, 'art');
            case 'travel':
                return filterCategoryField(items, 'travel');
            case 'science':
                return filterCategoryField(items, 'science');
            case 'fashion':
                return filterCategoryField(items, 'fashion');
            case 'lifestyle':
                return filterCategoryField(items, 'lifestyle');
            case 'event':
                return filterCategoryField(items, 'event');
            case 'architecture':
                return filterCategoryField(items, 'architecture');
            case 'technology':
                return filterCategoryField(items, 'technology');
            default:
                return items;
        }
    }

    const onDateFilterChange = (filter) => {
        setDateFilter(filter);
        setRatingFilter(null);
    }

    const sortDateByAscending = (a, b) => {
        const dateA = a.created_at
        const dateB = b.created_at
        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }
        return comparison;
    }

    const sortDateByDescending = (a, b) => {
        const dateA = a.created_at
        const dateB = b.created_at
        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }
        return comparison * -1;
    }

    const filterPhotosByDate = (items, filter) => {
        switch(filter) {
            case 'dateAscending':
                return items.sort(sortDateByAscending);
            case 'dateDescending':
                return items.sort(sortDateByDescending)
            default:
                return items;
        }
    }

    const onRatingFilterChange = (filter) => {
        setRatingFilter(filter);
        setDateFilter(null);
    }

    const sortRatingByAscending = (a, b) => {
        const ratingA = a.users.length
        const ratingB = b.users.length
        let comparison = 0;
        if (ratingA > ratingB) {
            comparison = 1;
        } else if (ratingA < ratingB) {
            comparison = -1;
        }
        return comparison;
    }

    const sortRatingByDescending = (a, b) => {
        const ratingA = a.users.length
        const ratingB = b.users.length
        let comparison = 0;
        if (ratingA > ratingB) {
            comparison = 1;
        } else if (ratingA < ratingB) {
            comparison = -1;
        }
        return comparison * -1;
    }

    const filterPhotosByRating = (items, filter) => {
        switch(filter) {
            case 'ratingAscending':
                return items.sort(sortRatingByAscending);
            case 'ratingDescending':
                return items.sort(sortRatingByDescending)
            default:
                return items;
        }
    }

    const strapiService = useContext(StrapiServiceContext);

    useEffect(() => {
        const interval = setInterval(() => {
            strapiService.getPhotos(token)
                .then(response => {
                    photosLoaded(response.data);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onLikePhoto = (photoId, photoLikes) => {
        const arrayOfLikes = photoLikes.map(item => item.id);
        arrayOfLikes.push(loggedInUserId);
        strapiService.updatePhoto(photoId, loggedInUserId, token, arrayOfLikes)
            .then(response => {
                console.log(response);
                strapiService.getPhotos(token)
                    .then(response => {
                        photosLoaded(response.data);
                    });
            });
    }

    let visiblePhotos;

    if (ratingFilter != null) {
        visiblePhotos = filterPhotosByRating(filterPhotosByCategory(search(photos, term), categoryFilter), ratingFilter);
    } else {
        visiblePhotos = filterPhotosByDate(filterPhotosByCategory(search(photos, term), categoryFilter), dateFilter);
    }

    const renderPhotos = visiblePhotos.map(photo => {
        const created_date = Date.parse(photo.created_at);
        const date_now = Date.now();
        const canLikeButton = (date_now - created_date) < 180000 ?
            <button
                onClick={() => onLikePhoto(photo.id, photo.users)}
                type="button" className="btn btn-danger w-50">
                <i className="far fa-thumbs-up"/>
                Like</button> : null;

        const splitDate = photo.created_at.split('T');
        const day = splitDate[0] + ' ';
        const hours = splitDate[1].substr(0, 8);
        const categories = photo.categories.map(item => {
            return item.name[0].toUpperCase() + item.name.slice(1) + ' ';
        });
        const rating = ' ' + photo.users.length;
        const username = photo.username + ' at: ';
        return (
            <div className="card mb-3" key={photo.id}>
                <img src={photo.url} alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{photo.title}</h5>
                    <p className="card-text"><small className="text-muted">{username}{day}{hours}</small></p>
                    <p className="card-text">{photo.description}</p>
                    <p className="card-text"><small className="text-muted">{categories}</small></p>
                    <h5 className="d-inline">Rating:{rating}</h5>
                </div>
                {canLikeButton}
            </div>
        );
    });

    return (
        <div className={classes["image-gallery"]}>
            <PhotoFilters
                onCategoryFilterChange={onCategoryFilterChange}
                onDateFilterChange={onDateFilterChange}
                onRatingFilterChange={onRatingFilterChange}
                onSearch={onSearch}
            />
            {console.log(photos)}
            {renderPhotos}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        photos: state.photos,
        loggedInUserId: state.loggedInUserId
    };
}

const mapDispatchToProps = {
    photosLoaded
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

