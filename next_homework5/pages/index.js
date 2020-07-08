import Head from 'next/head';
import SumInfo from "../components/sum-info/sum-info";
import CountrySum from "../components/country-sum/country-sum";
import Covid19Service from "../services/covid19-service";
import Header from "../components/header/header";

export default function Home( { data }) {
  return (
    <div className="container">
      <Head>
        <title>Covid19 App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
                integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
                crossOrigin="anonymous" />
      </Head>

        <Header />
        <SumInfo data={data['Global']}/>
        <CountrySum data={data['Countries']}/>


        <style global jsx>{`
            * {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
            }
            body {
              background-color: #e7e7e7;
              margin: 0 auto;
            }
            i {
                margin-right: 5px;
            }
        `}</style>
    </div>
  )
}

export async function getServerSideProps(context) {
    const covid19Service = new Covid19Service();
    const data = await covid19Service.getSummary();
    return { props: { data } }
}



