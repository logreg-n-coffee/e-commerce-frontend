import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import products from '../products.json';

import { useCart } from '../hooks/use-cart';

const Home = () => {

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>E-commerce Store</title>
        <meta name="description" content="E-commerce Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>E-commerce Store</h1>

        <p className={styles.description}>
          Here we have the best product available for you
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { title, price, description, image, id } = product;
            return (
              <li className={styles.card} key={id}>
                <Link href={`/products/${id}`}>
                  <a>
                    <Image src={image} alt={title} width={120} height={120} />
                    <h3>{title}</h3>
                    <p>${price}</p>
                    <p>{description}</p>
                  </a>
                </Link>

                <p>
                  <button className={styles.button} onClick={() => addToCart({ id })}>
                    Add to Cart
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}></footer>

    </div>
  );
};

export default Home;
