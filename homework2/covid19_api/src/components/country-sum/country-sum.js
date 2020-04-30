import React, {useState, useEffect} from 'react';
import './country-sum.css';
import Covid19Service from '../../services/covid19-service';
import ReactCountryFlag from 'react-country-flag';

const CountrySum = () => {

    const cv19Service = new Covid19Service();

    const [countries, setCountries] = useState([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        cv19Service.getSummary()
            .then((data) => {
                setCountries(data['Countries']);
            });
    }, []);

    const search = (items, term) => {

        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item['Country'].toLowerCase().indexOf(term.toLowerCase()) > -1;
        });

    }

    const visibleItems = search(countries, term);

    const onSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTerm(searchTerm);
    }

    visibleItems.sort((a, b) => {
        const aDeaths = parseInt(a['NewDeaths']);
        const bDeaths = parseInt(b['NewDeaths']);

        let comparison = 0;
        if (aDeaths > bDeaths) {
            comparison = -1;
        } else if (aDeaths < bDeaths) {
            comparison = 1;
        }
        return comparison;
    });

    const tableRows = visibleItems.map((country) => {
        return (
            <tr key={country['CountryCode']}>
                <td>
                    <ReactCountryFlag 
                        className="flag"
                        svg 
                        countryCode={country['CountryCode']}
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                    }}/>
                    {country['Country']}
                </td>
                <td>{country['NewConfirmed']}</td>
                <td>{country['TotalConfirmed']}</td>
                <td>{country['NewDeaths']}</td>
                <td>{country['TotalDeaths']}</td>
                <td>{country['NewRecovered']}</td>
                <td>{country['TotalRecovered']}</td>
            </tr>
        );
    });


    return (
        <div className="country-sum">
            <input 
                value={term} type="text" 
                className="form-control search-input" 
                placeholder="Type to search"
                onChange={onSearchChange}/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">New Confirmed</th>
                        <th scope="col">Total Confirmed</th>
                        <th scope="col">New Deaths</th>
                        <th scope="col">Total Deaths</th>
                        <th scope="col">New Recovered</th>
                        <th scope="col">Total Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>

        </div>
    );

}

export default CountrySum;