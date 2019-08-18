import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Error from "./_error";

export default function Home(props) {
  const { channels, statusCode } = props;

  if (statusCode >= 400) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title="Podcasts">
      <Grid elements={channels} nextRoute={"channel"} />
    </Layout>
  );
}

Home.getInitialProps = async ({ res }) => {
  try {
    const req = await fetch("https://api.audioboom.com/channels/recommended");
    const { body: channels } = await req.json();

    if (req.status >= 400) {
      res.statusCode = req.status;
      return { channels: null, statusCode: req.status };
    }

    return { channels, statusCode: 200 };
  } catch (error) {
    return { channels: null, statusCode: 503 };
  }
};
