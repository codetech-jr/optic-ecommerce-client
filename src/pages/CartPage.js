// client/src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../redux/cartSlice';
import Container from '../components/Container'; // <-- Importa Container
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Añade useNavigate
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // --- NUEVA FUNCIÓN HANDLER ---
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping'); // Llevamos al login y luego a /shipping
  };

  return (
    <Container>
      <div className="cart-container">
        <h1>Cesta de la Compra</h1>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            Tu cesta está vacía. <Link to="/">Volver a la tienda</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <Link to={`/product/${item._id}`} className="cart-item-name">{item.name}</Link>
                <div className="cart-item-price">${item.price}</div>
                {item.prescriptionFile && (
                <div className="cart-item-prescription-file">
                  <a href={item.prescriptionFile} target="_blank" rel="noopener noreferrer">
                    Ver Receta Subida
                  </a>
                </div>
                )}
                {item.prescription && item.prescription.pd && (
                  <div className="cart-item-prescription">
                    <p>Graduación: OD SPH {item.prescription.sph.od}, OS SPH {item.prescription.sph.os}...</p>
                  </div>
                )}
                <div className="cart-item-qty">Cantidad: {item.qty}</div>
                <button onClick={() => removeFromCartHandler(item._id)} className="cart-item-remove">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen</h2>
            <p>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items):
              <strong>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </strong>
            </p>
            <button
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler} // <-- Añade el handler
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
    </Container>
  );
};

export default CartPage;