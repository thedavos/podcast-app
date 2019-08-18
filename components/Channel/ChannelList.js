import { Fragment } from "react";
import Modal from "../../components/Modal";
import PodcastPlayer from "../../components/PodcastPlayer";
import Empty from "../Empty";
import { Link } from "../../routes";
import slug from "../../helpers/slug";

const ChannelList = props => {
  const {
    audioClips,
    openPodCast,
    handleClickSetPodcast,
    handleClickOnClose,
    selection,
    title
  } = props;
  return (
    <Fragment>
      {selection.showClips && (
        <section className="channel-audios">
          {openPodCast && (
            <Modal>
              <PodcastPlayer
                clip={openPodCast}
                handleClickOnClose={handleClickOnClose}
              />
            </Modal>
          )}
          <h2 className="channel-section-title">AudioClips de {title}</h2>
          {audioClips.length ? (
            <div className="clips">
              {audioClips.map(clip => (
                <Link
                  route="podcast"
                  params={{
                    slugChannel: slug(clip.channel.title),
                    idChannel: clip.channel.id,
                    slug: slug(clip.title),
                    id: clip.id
                  }}
                  key={clip.id}
                  prefetch
                >
                  <a
                    className="clip"
                    onClick={event => handleClickSetPodcast(event, clip)}
                  >
                    <img src={clip.urls.image} alt={clip.title} />
                    <div className="clip-content">
                      <h2>{clip.title}</h2>
                      <p>{Math.ceil(clip.duration / 60)} minutes</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          ) : (
            <Empty />
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

          .clips {
            display: grid;
            // grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
            padding: 20px;
          }

          a.clip {
            display: flex;
            margin-bottom: 1em;
            text-decoration: none;
            color: #333;
          }

          .clip img {
            border-radius: 3px;
            max-width: 100px;
            width: 100%;
            vertical-align: top;
            object-fit: cover;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          }

          .clip-content {
            padding-left: 8px;
            align-self: center;
          }

          .clip-content h2 {
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
          }

          .clip-content p {
            margin: 0;
            padding: 1em 0;
            font-size: 0.7em;
            font-weight: 300;
          }

          @media only screen and (max-width: 500px) {
            a.clip {
              flex-direction: column;
              align-items: center;
              font-size: 0.9em;
            }
          }
        `}
      </style>
    </Fragment>
  );
};

export default ChannelList;
