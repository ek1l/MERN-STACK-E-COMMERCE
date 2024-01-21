import { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/Cart-item';
import { Link } from 'react-router-dom';
const cartItems = [
  {
    productId: 'asasasas',
    photo: 'https://i.zst.com.br/thumbs/12/37/12/-36761254.jpg',
    name: 'MacBook',
    price: 3000,
    quantity: 4,
    stock: 10,
  },
];

const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;
const discount = 400;
const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCouponCode(true);
      } else {
        setIsValidCouponCode(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
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
