import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

/* eslint-disable @typescript-eslint/no-explicit-any */
type CartItemProps = {
  cartItem: any;
};
const CartItem = ({ cartItem }: CartItemProps) => {
  const { photo, productId, name, price, quantity, stock } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>R$ {price}</span>
      </article>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
