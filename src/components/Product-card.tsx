import { FaPlus } from 'react-icons/fa';

type ProductsProps = {
  productID: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};
const server = 'ewqewqeqw';

const ProductCard = ({
  productID,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>R$ {price}</span>
      <div>
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
