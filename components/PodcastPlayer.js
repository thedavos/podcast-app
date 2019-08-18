import { Link } from "../routes";
import slug from "../helpers/slug";

const PodcastPlayer = props => {
  const { clip: audio_clip, handleClickOnClose } = props;

  return (
    <div className="podcast-layout">
      {handleClickOnClose ? (
        <a className="go-back" onClick={handleClickOnClose}>
          &lt; Volver
        </a>
      ) : (
        <Link
          route="channel"
          params={{
            slug: slug(audio_clip.channel.title),
            id: audio_clip.channel.id
          }}
          prefetch
        >
          <span className="go-back">&lt; Volver</span>
        </Link>
      )}
      <figure className="podcast-image">
        <img src={audio_clip.urls.image} alt={audio_clip.title} />
      </figure>
      <div className="podcast-audio">
        <div className="podcast-title">
          <h1>{audio_clip.title}</h1>
          <p>{audio_clip.channel.title}</p>
        </div>
        <audio src={audio_clip.urls.high_mp3} controls />
      </div>
      <style jsx>
        {`
          .go-back {
            cursor: pointer;
            color: white;
            margin-left: 15px;
            padding-top: 15px;
          }

          .podcast-layout {
            background-color: #7b51a5;
            min-height: 100vh;
            display: grid;
            grid-template-rows: auto 1fr auto;
          }

          .podcast-image {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 2em;
            text-align: center;
            margin: 0;
          }

          .podcast-image img {
            width: 350px;
            height: 350px;
            object-fit: contain;
            max-width: 100%;
            vertical-align: top;
          }

          .podcast-audio {
            background-color: #4d306b;
            padding: 1em;
            color: white;
          }

          .podcast-title {
            margin-bottom: 2.5em;
            text-align: center;
            font-size: 0.9em;
          }

          .podcast-audio h1 {
            font-size: 1.5em;
            font-weight: 500;
          }

          .podcast-audio audio {
            width: 100%;
            outline: none;
          }

          @media only screen and (max-width: 400px) {
            .podcast-audio {
              font-size: 0.8em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PodcastPlayer;
