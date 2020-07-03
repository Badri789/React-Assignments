import reducer from "./index";
import {describe, expect, it} from "@jest/globals";

describe('reducer test', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isLoggedIn: false,
            token: "",
            loggedInUser: "",
            loggedInUserId: "",
            photos: [],
            theme: "light"
        });
    });

    it('should store token when logged in', () => {
        expect(reducer({
            isLoggedIn: false,
            token: "",
            loggedInUser: "",
            loggedInUserId: "",
            photos: [],
            theme: "light"
        }, {
            type: 'USER_AUTHENTICATED',
            payload: {token: 'some-token',  username: 'some-username', userId: 'some-userId'}
        })).toEqual({
            isLoggedIn: true,
            token: "some-token",
            loggedInUser: "some-username",
            loggedInUserId: "some-userId",
            photos: [],
            theme: "light"
        });
    });
});