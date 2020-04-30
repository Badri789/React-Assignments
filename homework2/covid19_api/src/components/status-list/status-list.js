import React, {useState, useEffect} from 'react';
import './status-list.css';
import ReactCountryFlag from 'react-country-flag';

const StatusList = ({ getCountries, getData, status }) => {

    const [countries, setCountries] = useState([]);
    const [currentInfo, setCurrentInfo] = useState([]);

    useEffect(() => {
        getCountries()
            .then((data) => {
                setCountries(data);
            });
    }, []);
    
    const showStatus = (slug) => {
        getData(slug)
            .then((data) => {
                setCurrentInfo(data);
            });
    }

    const countryDays = currentInfo.map((item, index) => {
        return (
            <li key={index} className="days list-group-item">
                <span>Date:&nbsp;{item['Date'].substr(0, 10)}</span>
                <span>{status}:&nbsp;{item['Cases']}</span>
                {item['Province'] ? <span>Province:&nbsp;{item['Province']}</span> : null}
            </li>
        );
    });

    const countryItems = countries.map((item) => {
        return (
            <li key={item['ISO2']} className="list-group-item"
            onClick={() => showStatus(item['Slug'])}>
                <ReactCountryFlag 
                        className="flag"
                        svg 
                        countryCode={item['ISO2']}
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                    }}/>
                <span>{item['Country']}</span>
            </li>
        );
    });

    return (
        <div className="status jumbotron rounded">
            <ul className="list-group list-group-flush">
                {countryItems}
            </ul>

            <ul className="list-group list-group-flush">
                {countryDays}
            </ul>

        </div>
    );
}


export default StatusList;


