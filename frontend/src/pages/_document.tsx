// frontend/src/pages/_document.tsx

// using styled-components in next.js and by default 'next' supports SSR (server-side rendering)
// when the server renders the component, it generates a different CSS classname
// than when the component is rendered on the client side
// to resolve this issue in the current file _document.tsx would need to adjust the compatibility to
// make sure that the client side and the server side would render the same classname

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
