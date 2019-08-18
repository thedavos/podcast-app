import { useState } from "react";
import fetch from "isomorphic-fetch";
import Layout from "../components/Layout";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelChooser from "../components/Channel/ChannelChooser";
import ChannelGrid from "../components/Channel/ChannelGrid";
import ChannelList from "../components/Channel/ChannelList";
import Error from "./_error";

export default function Channel(props) {
  const { channel, series, audioClips, statusCode } = props;

  const [selection, setSelection] = useState({
    showClips: true,
    showSeries: false
  });

  const [openPodCast, setPodcast] = useState(null);

  const handleClickSetPodcast = (ev, podcast) => {
    ev.preventDefault();
    setPodcast(podcast);
  };

  const handleClickOnClose = ev => {
    ev.preventDefault();
    setPodcast(null);
  };

  const handleSelection = media => {
    if (media === "series") {
      setSelection({ showSeries: true, showClips: false });
    } else {
      setSelection({ showSeries: false, showClips: true });
    }
  };

  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  return (
    <Layout title={channel.title}>
      <ChannelHeader channel={channel} />
      <ChannelChooser handleSelection={handleSelection} />
      <ChannelList
        openPodCast={openPodCast}
        handleClickSetPodcast={handleClickSetPodcast}
        handleClickOnClose={handleClickOnClose}
        selection={selection}
        audioClips={audioClips}
        title={channel.title}
      />
      <ChannelGrid
        selection={selection}
        elements={series}
        parentTitle={channel.title}
        nextLink="serie"
      />
    </Layout>
  );
}

Channel.getInitialProps = async ({ query, res }) => {
  const idChannel = query.id;

  try {
    const [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
    ]);

    if (reqChannel.status >= 400) {
      res.statusCode = reqChannel.status;
      return {
        channel: null,
        series: null,
        audioClips: null,
        statusCode: reqChannel.status
      };
    }

    const dataChannel = await reqChannel.json();
    const dataSeries = await reqSeries.json();
    const dataAudios = await reqAudios.json();

    const { channel } = dataChannel.body;
    const { channels: series } = dataSeries.body;
    const { audio_clips: audioClips } = dataAudios.body;

    return {
      channel,
      series,
      audioClips,
      statusCode: 200
    };
  } catch (error) {
    return {
      channel: null,
      series: null,
      audioClips: null,
      statusCode: 503
    };
  }
};
