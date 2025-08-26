import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="https://github.com/drewbrownie21/yard-planner">Github Repo</a>
      </div>
    </footer>
  );
}
