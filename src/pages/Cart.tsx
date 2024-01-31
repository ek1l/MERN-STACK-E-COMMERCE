import { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import CartItemCard from '../components/Cart-item';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartReducerInitialState } from '../types/reducer-types';
import {
  addToCart,
  calculatePrice,
  discountApply,
  removeCartItem,
} from '../redux/reducer/cartReducer';
import { CartItem } from '../types/types';
import axios from 'axios';
import { server } from '../redux/store';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer,
    );
  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const remove = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApply(res?.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch((_) => {
          dispatch(discountApply(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemCard
              key={idx}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementhandler={decrementHandler}
              removeHandler={remove}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>SubTotal: R$ {subtotal}</p>
        <p>Sipping Charges: R$ {shippingCharges}</p>
        <p>Tax: R$ {tax}</p>
        <p>
          Discount: <em className="red"> - R$ {discount}</em>
        </p>
        <p>
          <b>Total: R${total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {}
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              R${discount} off using the
              <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
