import Head from "next/head";
import Table from "../components/Table";
import styles from "../styles/Cart.module.css";
import { FaShoppingCart } from "react-icons/fa";

import { useCart } from "../hooks/use-cart";
import products from "../products.json";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "price",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  }
];

const Home = () => {

  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map(({ id, quantity, pricePerItem }) => {

    // get the product name from the products json 
    const product = products.find(({ id: pid }) => pid === id);
    const { title } = product || {}; 

    // add Quantity component so that users can change item quantity value manually
    const Quantity = () => {

      const handleOnSubmit = e => {
        
        e.preventDefault();

        // get the quantity value from the input 
        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(input => input.name === 'quantity')?.value;

        console.log('inputs', inputs);
        console.log('quantity', quantity);

        // update the quantity state
        updateItem({
          id, 
          quantity: quantity && parseInt(quantity)
        });

      };

      return (
        <form onSubmit={handleOnSubmit}>
          <input type='number' name='quantity' min={0} defaultValue={quantity} />
          <button>Update</button>
        </form>
      );
    };

    return {
      id,
      title,
      quantity: <Quantity />,
      price: pricePerItem.toFixed(2),
      total: (quantity * pricePerItem).toFixed(2),
    };
  });

  console.log('data', data);

  console.log('useCart', useCart());

  console.log('cartItems', cartItems);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
