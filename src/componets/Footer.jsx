import styles from "./Footer.moduel.css";

export function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <p className={styles.copywrite}>
          {" "}
          &copy; Copywrite {new Date().getFullYear()} by S. Lantz
        </p>
      </footer>
    </div>
  );
}

export default Footer;
