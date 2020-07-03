import axios from "axios";

class StrapiService {

    _apiBase = 'http://localhost:1337/'

    async registerUser(username, email, password) {
        return await axios.post(`${this._apiBase}auth/local/register`, {
            username: username,
            email: email,
            password: password,
        });
    }

    async loginUser(email, password) {
        return await axios.post(`${this._apiBase}auth/local`, {
                identifier: email,
                password: password,
            });
    }

    async createPhoto(title, url, description, username, token, categoryIds) {
        return await axios.post(`${this._apiBase}photos`, {
               title: title,
               url: url,
               description: description,
               username: username,
               categories: categoryIds
           },
           {
               headers: {
                   'Authorization': `Bearer ${token}`
               }
           }
        );
    }

    async getPhotos(token) {
        return await axios.get(`${this._apiBase}photos`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }

    async updatePhoto(photoId, userId, token, userLikes) {
        return await axios.put(`${this._apiBase}photos/${photoId}`, {
                users: userLikes
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }


}

export default StrapiService;

