class Covid19Service {

    _apiBase = 'https://api.covid19api.com/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        return await res.json();
    }

    getSummary() {
        return this.getResource('summary');
    }

    getCountries() {
        return this.getResource('countries');
    }

    getDayOneConfirmed(country) {
        return this.getResource(`dayone/country/${country}/status/confirmed`);
    }

    getDayOneRecovered(country) {
        return this.getResource(`dayone/country/${country}/status/recovered`);
    }

    getDayOneDeaths(country) {
        return this.getResource(`dayone/country/${country}/status/deaths`);
    }
}

export default Covid19Service;