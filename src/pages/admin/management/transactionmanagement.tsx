import { FaTrash } from 'react-icons/fa';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { server } from '../../../redux/store';
import { Order, OrderItem } from '../../../types/types';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { useSelector } from 'react-redux';
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from '../../../redux/api/orderAPI';
import { Skeleton } from '../../../components/Loader';
import { responseToast } from '../../../utils/features';

const defaultData: Order = {
  shippingInfo: {
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  },
  status: 'Processing',
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: '', _id: '' },
  _id: '',
  price: 0,
  stock: 0,
  name: '',
  photo: '',
};
const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer,
  );

  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;
  const [updateOrder] = useUpdateOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: String(user?._id),
      orderId: String(data?.order?._id),
    });
    responseToast(res, navigate, '/admin/transaction');
  };

  const [deleteOrder] = useDeleteOrderMutation();

  const deletehandler = async () => {
    const res = await deleteOrder({
      userId: String(user?._id),
      orderId: String(data?.order?._id),
    });
    responseToast(res, navigate, '/admin/transaction');
  };

  if (isError) return <Navigate to={'/404'} />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {' '}
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
                Address:{' '}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
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
          </>
        )}{' '}
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
      R${price} X {quantity} = R${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
