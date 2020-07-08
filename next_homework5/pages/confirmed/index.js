import React from "react";
import StatusList from "../../components/status-list/status-list";
import Layout from "../../components/layout";
import Covid19Service from "../../services/covid19-service";

const ConfirmedPage = ({ countries }) => {
    const covid19Service = new Covid19Service();

    return (
        <Layout>
            <StatusList
                countries={countries}
                status="Confirmed"
                getData={(slug) => covid19Service.getDayOneConfirmed(slug)}
            />
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const covid19Service = new Covid19Service();
    const countries = await covid19Service.getCountries();

    return {
        props: {
            countries
        }
    }
}

export default ConfirmedPage;

