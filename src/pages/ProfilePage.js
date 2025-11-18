// client/src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/userSlice';
import { listMyOrders } from '../redux/orderSlice';
import { toast } from 'react-toastify';
import Container from '../components/Container'; // <-- Importa Container
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(listMyOrders());
    }
  }, [dispatch, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden'); // <-- Muestra un toast de error
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
      toast.success('Perfil actualizado con éxito'); // <-- Muestra un toast de éxito
    }
  };

  return (
    <Container>
      <div className="profile-container">
        <div className="profile-form">
          <h2>Perfil de Usuario</h2>
          {message && <p className="success-message">{message}</p>}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Actualizar</button>
          </form>
        </div>
        <div className="profile-orders">
          <h2>Mis Pedidos</h2>
          {loadingOrders ? <p>Cargando pedidos...</p> : errorOrders ? <p className="error-message">{errorOrders}</p> : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FECHA</th>
                  <th>TOTAL</th>
                  <th>PAGADO</th>
                  <th>ENTREGADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>{/* Pagado? */}</td>
                    <td>{/* Entregado? */}</td>
                    <td><a href={`/order/${order._id}`}>Detalles</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;