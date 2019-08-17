import { useState } from "react";
import globalStyles from "../style/globalStyles";
import Link from "next/link";

export default function Channel(props) {
  const { channel, series, audioClips } = props;
  const [selection, setSelection] = useState({
    showClips: true,
    showSeries: false
  });
  const actualCreationDate = new Date(channel.created_at).toLocaleDateString();
  const formattedPlays = Number(channel.total_plays).toLocaleString();

  const handleSelection = media => {
    if (media === "series") {
      setSelection({ showSeries: true, showClips: false });
    } else {
      setSelection({ showSeries: false, showClips: true });
    }
    console.log(selection);
  };

  return (
    <div>
      <header className="channel_header">
        <div className="channel_layout">
          <figure className="channel_logo">
            <img src={channel.urls.logo_image.original} alt={channel.title} />
          </figure>
          <div className="channel-content">
            <div className="channel-title">
              <h1>{channel.title}</h1>
            </div>
            <div className="channel-details">
              <h2>{channel.category.title}</h2>
              <div className="channel-details-small">
                <p>{formattedPlays} veces reproducidas</p>
                <p>{actualCreationDate}</p>
              </div>
            </div>
            <div className="channel-description">
              <p>{channel.description}</p>
            </div>
          </div>
        </div>
      </header>
      <section className="channel-chooser">
        <button
          className="channel-btn"
          onClick={() => handleSelection("series")}
        >
          Series
        </button>
        <button
          className="channel-btn"
          onClick={() => handleSelection("clips")}
        >
          Audios
        </button>
      </section>
      {selection.showClips && (
        <section className="channel-audios">
          <h2 className="channel-section-title">
            AudioClips de {channel.title}
          </h2>
          {audioClips.length ? (
            <div className="clips">
              {audioClips.map(clip => (
                <Link href={`podcast?id=${clip.id}`} key={clip.id} prefetch>
                  <a className="clip">
                    <img src={clip.urls.image} alt={channel.title} />
                    <h2>{clip.title}</h2>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div>No se encontraron audios</div>
          )}
        </section>
      )}
      {selection.showSeries && (
        <section className="channel-series">
          <h2 className="channel-section-title">Series de {channel.title}</h2>
          {series.length ? (
            <div className="series">
              {series.map(serie => (
                <Link href={`serie?id=${serie.id}`} key={serie.id} prefetch>
                  <a className="serie">
                    <img
                      src={serie.urls.logo_image.original}
                      alt={serie.title}
                    />
                    <h2>{serie.title}</h2>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <div>No se encontraron series</div>
          )}
        </section>
      )}
      <style jsx>
        {`
          .channel-section-title {
            font-size: 1.1em;
            text-transform: uppercase;
            padding-left: 15px;
            font-weight: 500;
            color: rebeccapurple;
            margin: 0;
          }

          .channel_header {
            background-image: url(${channel.urls.banner_image.original});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 3em 0;
          }

          .channel_layout {
            display: grid;
            grid-template-columns: minmax(300px, auto) 1fr;
            max-width: 80vw;
            margin: 0 auto;
            border: 1px solid #3a0e66;
          }

          .channel_logo {
            margin: 0;
          }

          .channel_logo img {
            vertical-align: top;
            max-width: 300px;
            width: 100%;
            height: 100%;
          }

          .channel-content {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 1em 20px;
          }

          .channel-title h1 {
            margin-bottom: 0;
          }

          .channel-details {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
          }

          .channel-details h2 {
            font-size: 1.2em;
            font-weight: 400;
            margin: 0;
            margin-right: 16px;
            margin-top: 8px;
          }

          .channel-details-small {
            margin-top: 8px;
            display: flex;
          }

          .channel-details-small p {
            font-size: 0.8em;
            margin: 0;
            font-weight: 300;
          }

          .channel-details-small p:last-child {
            margin-left: 16px;
          }

          .channel-description p {
            margin-top: 1.5em;
            margin-bottom: 0;
            line-height: 26px;
          }

          // channel detailes chooser
          .channel-chooser {
            padding-top: 2em;
            padding-bottom: calc(2em - 15px);
            text-align: center;
          }

          .channel-btn {
            margin: 0.5em;
            padding: 0.5em 2em;
            color: white;
            background-color: rebeccapurple;
            outline: none;
            border: 0;
            border-radius: 12px;
            cursor: pointer;
            transition: transform 0.4s;
          }

          .channel-btn:active {
            transform: scale(0.9);
          }

          // audio clips

          .clips,
          .series {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          a.clip,
          a.serie {
            display: block;
            margin-bottom: 0.5em;
            text-decoration: none;
            color: #333;
          }

          .clip img,
          .serie img {
            border-radius: 3px;
            width: 100%;
            vertical-align: top;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          }

          .clip h2,
          .serie h2 {
            text-align: center;
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
          }

          @media only screen and (max-width: 1000px) {
            .channel-details-small p {
              margin: 0;
            }

            .channel_layout {
              max-width: 95vw;
            }
          }

          @media only screen and (max-width: 700px) {
            .channel-content {
              font-size: 0.7em;
            }
          }

          @media only screen and (max-width: 600px) {
            .channel_layout {
              grid-template-columns: 300px;
              justify-content: center;
              border: 0;
            }
          }
        `}
      </style>
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

Channel.getInitialProps = async ({ query }) => {
  const idChannel = query.id;

  const [dataChannel, dataSeries, dataAudios] = await Promise.all([
    fetch(`https://api.audioboom.com/channels/${idChannel}`).then(res =>
      res.json()
    ),
    fetch(
      `https://api.audioboom.com/channels/${idChannel}/child_channels`
    ).then(res => res.json()),
    fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`).then(
      res => res.json()
    )
  ]);

  const { channel } = dataChannel.body;
  const { channels: series } = dataSeries.body;
  const { audio_clips: audioClips } = dataAudios.body;

  return {
    channel,
    series,
    audioClips
  };
};
