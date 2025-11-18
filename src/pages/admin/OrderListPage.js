// client/src/pages/admin/OrderListPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../redux/orderSlice';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import './UserListPage.css'; // Reutilizamos los estilos

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Asegúrate de que estás leyendo del estado correcto en Redux.
  // El estado 'orders' lo añadimos a 'orderSlice'.
  const orderList = useSelector((state) => state.order);
  const { orders, loading, error } = orderList;
  
  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="userlist-container">
      <h1>Pedidos</h1>
      {loading ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
        <table className="userlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>PAGADO</th>
              <th>ENTREGADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <a href={`/order/${order._id}`}>Detalles</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderListPage;