import React from 'react';
import Header from '../header/header';
import SumInfo from '../sum-info/sum-info';
import CountrySum from '../country-sum/country-sum';
import Covid19Service from '../../services/covid19-service';
import StatusList from '../status-list/status-list';
import {BrowserRouter, Route} from 'react-router-dom';

const App = () => {

    const cv19Service = new Covid19Service();

    return (
        <BrowserRouter>
            <div>
                <Header />

                <Route path="/" render={() => {
                    return (
                        <React.Fragment >
                            <SumInfo />
                            <CountrySum />
                        </React.Fragment>
                    );
                }} exact/>

                <Route path="/summary" render={() => {
                    return (
                        <React.Fragment >
                            <SumInfo />
                            <CountrySum />
                        </React.Fragment>
                    );
                }} />
                
                <Route path="/dayone/confirmed" 
                    render={(props) => 
                        <StatusList 
                            getCountries={() => cv19Service.getCountries()}
                            getData={(slug) => cv19Service.getDayOneConfirmed(slug)}
                            status="Confirmed"
                            {...props}
                            />
                    }
                />

                <Route path="/dayone/recovered" 
                    render={(props) => 
                        <StatusList 
                            getCountries={() => cv19Service.getCountries()}
                            getData={(slug) => cv19Service.getDayOneRecovered(slug)}
                            status="Recovered"
                            {...props}
                            />
                    }
                />

                <Route path="/dayone/deaths" 
                    render={(props) => 
                        <StatusList 
                            getCountries={() => cv19Service.getCountries()}
                            getData={(slug) => cv19Service.getDayOneDeaths(slug)}
                            status="Deaths"
                            {...props}
                            />
                    }
                />
                
            </div>
        </BrowserRouter>
    );
}

export default App;
