import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-['Orbitron']">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
