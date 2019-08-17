import fetch from "isomorphic-fetch";
import Link from "next/link";
import globalStyles from "../style/globalStyles";

export default function Home(props) {
  const { channels } = props;
  return (
    <div>
      <header>Podcasts</header>
      <div className="channels">
        {channels.map(channel => (
          <Link href={`channel?id=${channel.id}`} key={channel.id} prefetch>
            <a className="channel">
              <img src={channel.urls.logo_image.original} alt={channel.title} />
              <h2>{channel.title}</h2>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }

          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          a.channel {
            display: block;
            margin-bottom: 0.5em;
            text-decoration: none;
            color: #333;
          }

          .channel img {
            border-radius: 3px;
            width: 100%;
            vertical-align: top;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          }

          h2 {
            text-align: center;
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
          }
        `}
      </style>

      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

Home.getInitialProps = async () => {
  const req = await fetch("https://api.audioboom.com/channels/recommended");
  const { body: channels } = await req.json();

  return { channels };
};
