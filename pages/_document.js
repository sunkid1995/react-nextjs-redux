import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

// Constants
import { IN_DEV_MODE } from 'src/constants';

/* eslint-disable react/jsx-sort-props */

export default class BaseDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { chunks, errorHtml, head, html } = renderPage();
    const styles = flush();
    return { chunks, errorHtml, head, html, styles };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="canonical" href="https://sales.wefit.vn/" />
          <link rel="shortcut icon" href="https://wefit.vn/wp-content/uploads/2017/01/favwefit.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="google-site-verification" content="9H-6SJd83YbuzS6DXi-mmfD2uQOyafYKfiRgDU2Xtkw" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-default.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/slide.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-s-alert@1.4.1/dist/s-alert-css-effects/stackslide.css" />
          <link rel="stylesheet" href="https://unpkg.com/react-select@1.2.1/dist/react-select.css" />
          {IN_DEV_MODE && <script async defer src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js" />}
          <title>{'WeFit CRM'}</title>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
