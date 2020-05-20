class ReqResApi {
    _apiBase = 'https://reqres.in/';

    async postData(userData, url) {
        
        const res = await fetch(`${this._apiBase}api/${url}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return await res.json();
    }

    async updateUser(userData, id) {
        
        const res = await fetch(`${this._apiBase}api/users/${id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return await res.json();
    }

    async deleteUser(id) {
        const res = await fetch(`${this._apiBase}api/users${id}`, {
            method: 'delete',
        });

        return res;
    }


    async getUsers(page) {
        const res = await fetch(`${this._apiBase}api/users?page=${page}`);
        return await res.json();
    }


    
}


export default ReqResApi;




