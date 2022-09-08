import styles from './Header.module.css';

const Header = () => {
  return (
    <section className={styles.header}>
      <h1 className={styles.title}>
        todos
      </h1>
    </section>
  );
};

export default Header;