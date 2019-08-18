import { Fragment } from "react";
import { Link } from "../../routes";
import slug from "../../helpers/slug";
import Empty from "../Empty";

const ChannelGrid = props => {
  const { selection, elements, nextLink, parentTitle } = props;
  return (
    <Fragment>
      {selection.showSeries && (
        <section className="channel-elements">
          <h2 className="channel-section-title">Series de {parentTitle}</h2>
          {elements.length ? (
            <div className="elements">
              {elements.map(element => (
                <Link
                  route={nextLink}
                  params={{
                    slug: slug(element.title),
                    id: element.id
                  }}
                  key={element.id}
                  prefetch
                >
                  <a className="element">
                    <img
                      src={element.urls.logo_image.original}
                      alt={element.title}
                    />
                    <h2>{element.title}</h2>
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

          .elements {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }

          a.element {
            display: block;
            margin-bottom: 0.5em;
            text-decoration: none;
            color: #333;
          }

          .element img {
            border-radius: 3px;
            width: 100%;
            vertical-align: top;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
          }

          .element h2 {
            text-align: center;
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
          }
        `}
      </style>
    </Fragment>
  );
};

export default ChannelGrid;
