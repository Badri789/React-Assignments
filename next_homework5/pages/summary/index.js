import React from "react";
import SumInfo from "../../components/sum-info/sum-info";
import Layout from "../../components/layout";
import Covid19Service from "../../services/covid19-service";
import CountrySum from "../../components/country-sum/country-sum";

const SummaryPage = ( { data } ) => {
    return (
        <Layout>
            <SumInfo data={data['Global']}/>
            <CountrySum data={data['Countries']}/>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const covid19Service = new Covid19Service();
    const data = await covid19Service.getSummary();
    return { props: { data } }
}

export default SummaryPage;



