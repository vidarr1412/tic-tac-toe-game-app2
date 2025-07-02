import Head from 'next/head';
import App from '../components/App'; // or wherever your App is located

export default function Home() {
  return (
    <>
      <Head>
        <title>Tic Tac Toe Game</title>
      </Head>
      <App />
    </>
  );
}
