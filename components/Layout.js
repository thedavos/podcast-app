import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import globalStyles from "../style/globalStyles";
import nProgressStyle from "../style/nProgress";

Router.onRouteChangeStart = url => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const Layout = props => {
  const { children, title } = props;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>
      </Head>
      {typeof props.header === "undefined" ? (
        <header>
          <Link href="/">
            <a>Podcasts</a>
          </Link>
        </header>
      ) : null}
      {children}

      <style jsx>
        {`
          header {
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }

          header a {
            color: #fff;
            text-decoration: none;
          }
        `}
      </style>
      <style jsx global>
        {globalStyles}
      </style>

      <style jsx global>
        {nProgressStyle}
      </style>
    </div>
  );
};

export default Layout;
