import React from "react";
import styles from "./sum-info.module.css";

const SumInfo = ({ data }) => {

    return (
        <div className={styles.infoBox}>
            {console.log(data)}
            <h3>Summary Statistics</h3>
            <ul className={styles.infoList}>
                <li >
                    <i className="fas fa-user-plus"/>
                    <span>New Confirmed:</span>
                    <span>{data['NewConfirmed']}</span>
                </li>
                <li >
                    <i className="fas fa-globe-americas"/>
                    <span>Total Confirmed:</span>
                    <span>{data['TotalConfirmed']}</span>
                </li>
                <li >
                    <i className="fas fa-skull-crossbones"/>
                    <span>New Deaths:</span>
                    <span>{data['NewDeaths']}</span>
                </li>
                <li >
                    <i className="fas fa-skull-crossbones"/>
                    <span>Total Deaths:</span>
                    <span>{data['TotalDeaths']}</span>
                </li>
                <li >
                    <i className="fas fa-hand-holding-medical"/>
                    <span>New Recovered:</span>
                    <span>{data['NewRecovered']}</span>
                </li>
                <li >
                    <i className="fas fa-hand-holding-medical"/>
                    <span>Total Recovered:</span>
                    <span>{data['TotalRecovered']}</span>
                </li>
            </ul>

        </div>
    );
}

export default SumInfo;
