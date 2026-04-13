import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.pokeballIcon}></div>
          <Link href="/">
            <h1>Poke<span>Explorer</span></h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
