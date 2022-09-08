import styles from './Footer.module.css';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <p>Double-click to edit a todo</p>
      <p>Created by<a className={styles.footerLink} href="https://github.com/Jakisley"> kisley</a></p>
    </section>
  );
};

export default Footer;
