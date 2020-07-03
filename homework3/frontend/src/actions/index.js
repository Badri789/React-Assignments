const userAuthenticated = (token, username, userId) => {
    return {
        type: 'USER_AUTHENTICATED',
        payload: {token, username, userId}
    };
}

const userLoggedOut = () => {
    return {
        type: 'USER_LOGGED_OUT'
    };
}

const photosLoaded = (photos) => {
    return {
        type: 'PHOTOS_LOADED',
        payload: photos
    };
}

const themeChanged = (theme) => {
    return {
        type: 'THEME_CHANGED',
        payload: theme
    }
}

export {
    userAuthenticated,
    userLoggedOut,
    photosLoaded,
    themeChanged
};

