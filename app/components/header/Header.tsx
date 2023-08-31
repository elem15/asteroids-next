import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__head}>ARMAGEDDON 2023</h1>
      <div className={styles.header__content}>
        ООО “Команда им. Б. Уиллиса”. <br />
        Взрываем астероиды с 1998 года.</div>
    </header>
  );
}
