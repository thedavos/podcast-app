import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const Error = props => {
  const { statusCode } = props;

  return (
    <Layout title="Error">
      <div className="container">
        <h1>{statusCode}</h1>
        {statusCode === 404 ? (
          <p>Tu página no ha sido encontrada. 😞</p>
        ) : (
          <p>Hubo un problema con el servidor. 😱</p>
        )}
        <Link href="/">
          <a>Volver al Home</a>
        </Link>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            padding: 100px 30px;
          }

          .container h1 {
            margin: 0;
            color: #af8ad4;
          }

          .container p {
            font-size: 1.2em;
            color: rebeccapurple;
          }

          .container a {
            color: rebeccapurple;
          }
        `}
      </style>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return { statusCode };
};

export default Error;
