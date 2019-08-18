import React from "react";

const ChannelChooser = props => {
  const { handleSelection } = props;
  return (
    <section className="channel-chooser">
      <button className="channel-btn" onClick={() => handleSelection("series")}>
        Series
      </button>
      <button className="channel-btn" onClick={() => handleSelection("clips")}>
        Audios
      </button>
      <style jsx>
        {`
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
        `}
      </style>
    </section>
  );
};

export default ChannelChooser;
