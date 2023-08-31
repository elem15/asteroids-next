import { declOfNum } from '@/app/utils/deklOfNum';
import styles from './CartWidget.module.css';
import Link from 'next/link';
import { CART_PAGE_URL } from '@/app/assets/constants/urls';

type Props = {
  loading: boolean;
  cartCounter: number;
};

export default function CartWidget({ loading, cartCounter }: Props) {

  return (
    <div className={styles.cart}>
      <h4>Корзина</h4>
      {!loading && <>
        {cartCounter > 0 ?
          <>
            <div>{cartCounter} {declOfNum(cartCounter, ['астероид', 'астероида', 'астероидов'])}</div>
            <Link href={CART_PAGE_URL}>Отправить</Link>
          </>
          : <div>Миссии не заказаны</div>
        }
      </>}
    </div>);
}
