import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Product.module.css";

import { useCart } from "../../hooks/useCart";

import products from "../../products.json";

const Product = ({ product }) => {
  const { id, title, image, price, description } = product;

  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - E-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <Image width={200} height={200} src={image} alt={title} layout='fixed' />
        </div>

        <div>
          <h1>{title}</h1>

          <p className={styles.description}>{description}</p>

          <p className={styles.description}>${price.toFixed(2)}</p>

          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default Product;

export const getStaticProps = async ({ params = {} }) => {
  const product = products.find(({ id }) => `${id}` === `${params.productId}`);
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = products.map((product) => {
    const { id } = product;
    return {
      params: {
        productId: id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};