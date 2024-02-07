import Link from 'next/link';

const Home = () => {
  return (
    <main>
      <h1>zinns.io</h1>
      <section>
        <p>Register</p>
        <ul>
          <li>
            <Link href='/erp/register/member'>new Member</Link>
          </li>
          <li>
            <Link href='/erp/register/padawan'>new Padawan</Link>
          </li>
          <li>
            <Link href='/erp/register/survey'>new Survey</Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
