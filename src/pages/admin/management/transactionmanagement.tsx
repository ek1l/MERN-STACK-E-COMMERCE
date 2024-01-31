import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { server } from '../../../redux/store';
import { OrderItem } from '../../../types/types';
import { useState } from 'react';

const orderItems: any[] = [];

const TransactionManagement = () => {
  const [order, setOrder] = useState({
    name: 'Puma Shoes',
    address: '77 black street',
    city: 'Neyword',
    state: 'Nevada',
    country: 'US',
    pinCode: 242433,
    status: 'Processing',
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHandler = () => {};
  const deletehandler = () => {};
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section
          style={{
            padding: '2rem',
          }}
        >
          <h2>Order Items</h2>

          {orderItems.map((i) => (
            <ProductCard
              key={i._id}
              name={i.name}
              photo={`${server}/${i.photo}`}
              productId={i.productId}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <button className="product-delete-btn" onClick={deletehandler}>
            <FaTrash />
          </button>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{' '}
            <span
              className={
                status === 'Delivered'
                  ? 'purple'
                  : status === 'Shipped'
                  ? 'green'
                  : 'red'
              }
            >
              {status}
            </span>
          </p>
          <button className="shipping-btn" onClick={updateHandler}>
            Process Status
          </button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
