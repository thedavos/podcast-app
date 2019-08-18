import React from "react";

const ChannelHeader = props => {
  const { channel } = props;
  const actualCreationDate = new Date(channel.created_at).toLocaleDateString();
  const formattedPlays = Number(channel.total_plays).toLocaleString();
  return (
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

      <style jsx>
        {`
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
    </header>
  );
};

export default ChannelHeader;
