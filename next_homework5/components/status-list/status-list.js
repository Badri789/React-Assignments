import React, {useState} from "react";
import ReactCountryFlag from "react-country-flag";
import styles from "./status-list.module.css";

const StatusList = ({ countries, getData, status }) => {

    const [currentInfo, setCurrentInfo] = useState([]);

    const showStatus = (slug) => {
        getData(slug)
            .then((data) => {
                setCurrentInfo(data);
            });
    }

    const countryItems = countries.map((item) => {
        return (
            <li key={item['ISO2']}
                onClick={() => showStatus(item['Slug'])}>
                <ReactCountryFlag
                    className="flag"
                    svg
                    countryCode={item['ISO2']}
                    style={{
                        width: '1.5em',
                        height: '1.5em',
                        marginRight: '5px'
                    }}/>
                <span>{item['Country']}</span>
            </li>
        );
    });

    const countryDays = currentInfo.map((item, index) => {
        return (
            <li key={index}>
                <span>Date:&nbsp;{item['Date'].substr(0, 10)}</span>
                <span>{status}:&nbsp;{item['Cases']}</span>
                {item['Province'] ? <span>Province:&nbsp;{item['Province']}</span> : null}
            </li>
        );
    });

    return (
        <React.Fragment>
            <h2 className={styles.statusTitle}>{status} by days</h2>
            <p className={styles.hint}>Click on country to see information</p>
            <div className={styles.statusDiv}>
                <ul className={styles.countryList}>
                    {countryItems}
                </ul>

                <ul className={styles.statusList}>
                    {countryDays}
                </ul>
            </div>
        </React.Fragment>
    );
}


export default StatusList;
