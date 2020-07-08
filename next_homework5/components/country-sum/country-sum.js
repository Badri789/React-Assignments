import React, {useState} from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./country-sum.module.css";

const CountrySum = ({ data }) => {

    const [term, setTerm] = useState('');

    const search = (items, term) => {

        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item['Country'].toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    const visibleItems = search(data, term);

    const onSearchChange = (event) => {
        const searchTerm = event.target.value;
        setTerm(searchTerm);
    }

    visibleItems.sort((a, b) => {
        const aDeaths = parseInt(a['TotalConfirmed']);
        const bDeaths = parseInt(b['TotalConfirmed']);

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
                            marginRight: '5px',
                        }}/>
                    {country['Country']}
                </td>
                <td className={styles.centeredData}>{country['NewConfirmed']}</td>
                <td className={styles.centeredData}>{country['TotalConfirmed']}</td>
                <td className={styles.centeredData}>{country['NewDeaths']}</td>
                <td className={styles.centeredData}>{country['TotalDeaths']}</td>
                <td className={styles.centeredData}>{country['NewRecovered']}</td>
                <td className={styles.centeredData}>{country['TotalRecovered']}</td>
            </tr>
        );
    });

    return (
        <div className={styles.tableContainer}>
            <input
                className={styles.searchbar}
                value={term} type="text"
                placeholder="Type to search"
                onChange={onSearchChange}/>
            <table className={styles.countryTable}>
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

