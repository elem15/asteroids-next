import { declOfNum } from '@/app/utils/deklOfNum';
import styles from './CartWidget.module.css';
import Link from 'next/link';
import { CART_PAGE_URL } from '@/app/assets/constants/urls';
import Image from 'next/image';

type Props = {
  loading: boolean;
  cartCounter: number;
};

export default function CartWidget({ loading, cartCounter }: Props) {

  return (
    <div className={styles.cart}>
      <div>
        <h4 className={styles.cart__title}>Корзина</h4>
        <div className={styles.cart__content}>{cartCounter} {declOfNum(cartCounter, ['астероид', 'астероида', 'астероидов'])}</div>
      </div>
      {cartCounter === 0 ?
        <div className={styles.cart__content}>Миссии не заказаны</div>
        : <Link href={CART_PAGE_URL}>
          <button className={styles.cart__button} disabled={loading}>
            Отправить
            {loading && <div className={styles.cart__preloader}>
              <Image className="spinner" src="/img/Spinner.png" alt="spinner" width={16} height={16} />
            </div>}
          </button></Link>
      }
    </div>);
}
