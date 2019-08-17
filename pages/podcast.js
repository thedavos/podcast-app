export default function Podcast(props) {
  console.log(props);
  const { audio_clip } = props;
  return (
    <div className="podcast-layout">
      <div className="go-back">
        <span>Volver</span>
      </div>
      <figure className="podcast-image">
        {/* <img src={audio_clip.urls.image} alt={audio_clip.title} /> */}
      </figure>
      <div className="podcast-audio">
        <h1 />
        <p />
        <audio src={audio_clip.urls.high_mp3} controls />
      </div>
    </div>
  );
}

Podcast.getInitialProps = async ({ query }) => {
  const idClip = query.id;

  const req = await fetch(
    `https://api.audioboom.com/audio_clips/${idClip}.mp3`
  );
  const {
    body: { audio_clip }
  } = await req.json();

  return { audio_clip };
};
