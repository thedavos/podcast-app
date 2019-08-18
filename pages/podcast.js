import fetch from "isomorphic-fetch";
import Error from "./_error";
import Layout from "../components/Layout";
import PodcastPlayer from "../components/PodcastPlayer";

export default function Podcast(props) {
  const { audio_clip, statusCode } = props;

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout header={false}>
      <PodcastPlayer clip={audio_clip} />
    </Layout>
  );
}

Podcast.getInitialProps = async ({ query, res }) => {
  const idClip = query.id;

  try {
    const req = await fetch(
      `https://api.audioboom.com/audio_clips/${idClip}.mp3`
    );

    if (req.status >= 400) {
      res.statusCode = req.status;
      return { audio_clip: null, statusCode: req.status };
    }

    const {
      body: { audio_clip }
    } = await req.json();

    return { audio_clip, statusCode: 200 };
  } catch (error) {
    return { audio_clip: null, statusCode: 503 };
  }
};
