const initialState = {
    isLoggedIn: false,
    token: "",
    loggedInUser: "",
    loggedInUserId: "",
    photos: [],
    theme: "light"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTHENTICATED':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                loggedInUser: action.payload.username,
                loggedInUserId: action.payload.userId
            };
        case 'USER_LOGGED_OUT':
            return {
                ...state,
                isLoggedIn: false,
                token: "",
                loggedInUser: "",
                loggedInUserId: ""
            };
        case 'PHOTOS_LOADED':
            return {
                ...state,
                photos: action.payload
            };
        case 'THEME_CHANGED':
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
}

export default reducer;
