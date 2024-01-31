import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
import { CartItem } from '../types/types';

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementhandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};
const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementhandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>R$ {price}</span>
      </article>
      <div>
        <button onClick={() => decrementhandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItemCard;
