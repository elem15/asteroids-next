import styles from './page.module.css';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <div className={styles.cart__footer}>© Все права и планета защищены</div>
    </section>
  );
}
