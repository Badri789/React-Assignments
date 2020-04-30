import React, { useState, useEffect } from 'react';
import './sum-info.css';
import Covid19Service from '../../services/covid19-service';
import Spinner from '../spinner/spinner';

const SumInfo = () => {

    const cv19Service = new Covid19Service();

    const [newConfirmed, setNewConfirmed] = useState(null);
    const [totalConfirmed, setTotalConfirmed] = useState(null);
    const [newDeaths, setNewDeaths] = useState(null);
    const [totalDeaths, setTotalDeaths] = useState(null);
    const [newRecovered, setNewRecovered] = useState(null);
    const [totalRecovered, setTotalRecovered] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cv19Service.getSummary()
            .then((data) => {
                setNewConfirmed(data['Global']['NewConfirmed']);
                setTotalConfirmed(data['Global']['TotalConfirmed']);
                setNewDeaths(data['Global']['NewDeaths']);
                setTotalDeaths(data['Global']['TotalDeaths']);
                setNewRecovered(data['Global']['NewRecovered']);
                setTotalRecovered(data['Global']['TotalRecovered'])
                setLoading(false);
            });
    }, []);

    const spinner = loading ? <Spinner /> : null
    const content = !loading ?  <SumView   
                                    newConfirmed={newConfirmed}
                                    totalConfirmed={totalConfirmed}
                                    newDeaths={newDeaths}
                                    totalDeaths={totalDeaths}
                                    newRecovered={newRecovered}
                                    totalRecovered={totalRecovered}
                                /> : null;

    return (
        <div className="info jumbotron rounded">
            {spinner}
            {content}
        </div>
    );
}

const SumView = ({newConfirmed, totalConfirmed, newDeaths, 
                totalDeaths, newRecovered, totalRecovered}) => {
    return (
        <React.Fragment>
            <h3>Summary Statistics</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <i className="fas fa-user-plus"></i>
                    <span className="term">New Confirmed:</span>
                    <span>{newConfirmed}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-globe-americas"></i>
                    <span className="term">Total Confirmed:</span>
                    <span>{totalConfirmed}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-skull-crossbones"></i>
                    <span className="term">New Deaths:</span>
                    <span>{newDeaths}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-skull-crossbones"></i>
                    <span className="term">Total Deaths:</span>
                    <span>{totalDeaths}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-hand-holding-medical"></i>
                    <span className="term">New Recovered:</span>
                    <span>{newRecovered}</span>
                </li>
                <li className="list-group-item">
                    <i className="fas fa-hand-holding-medical"></i>
                    <span className="term">Total Recovered:</span>
                    <span>{totalRecovered}</span>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default SumInfo;