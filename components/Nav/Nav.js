import Link from 'next/link';
import styles from './Nav.module.css';
import { FaShoppingCart } from "react-icons/fa";

import { useCart } from '../../hooks/use-cart';

const Nav = () => {
    const { subtotal, checkout } = useCart();

    return (
      <nav className={styles.nav}>
        <p className={styles.navTitle}>E-commerce Store</p>
        <p className={styles.navCart}>
          <Link href="/cart" onClick={checkout} >
            <a>
              <FaShoppingCart /> ${subtotal.toFixed(2)}
            </a>
          </Link>
        </p>
      </nav>
    );
};

export default Nav;
