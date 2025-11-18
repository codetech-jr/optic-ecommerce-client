// client/src/pages/PlaceOrderPage.js
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, orderCreateReset } from '../redux/orderSlice';
import { clearCart } from '../redux/cartSlice';
import './PlaceOrderPage.css';

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Obtenemos el cart directamente (sin intentar modificarlo después)
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const { order, success, error, loading } = useSelector((state) => state.order);

  // --- Cálculos de Precios ---
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  // 2. Calculamos los valores en VARIABLES INDEPENDIENTES
  //    (Evitamos cart.itemsPrice = ... porque 'cart' es de solo lectura)
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  
  const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
  
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // Efecto que se ejecuta después de que la orden se crea con éxito
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(orderCreateReset());
      dispatch(clearCart());
    }
  }, [navigate, dispatch, success, order]);

  const placeOrderHandler = () => {
    // Aseguramos que cada item tenga el campo `product`
    const normalizedOrderItems = cartItems.map((item) => ({
      ...item,
      product: item.product || item._id,
    }));

    dispatch(
      createOrder({
        orderItems: normalizedOrderItems,
        shippingAddress,
        paymentMethod,
        // 3. Enviamos las variables calculadas
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <div className="placeorder-container">
      <div className="placeorder-details">
        {/* --- COLUMNA DE DETALLES --- */}
        <h2>Dirección de Envío</h2>
        <p>
          <strong>Dirección: </strong>
          {shippingAddress.address}, {shippingAddress.city},{' '}
          {shippingAddress.postalCode}, {shippingAddress.country}
        </p>
        <hr />
        <h2>Método de Pago</h2>
        <p>
          <strong>Método: </strong>
          {paymentMethod}
        </p>
        <hr />
        <h2>Artículos del Pedido</h2>
        {cartItems.length === 0 ? (
          <p>Tu cesta está vacía</p>
        ) : (
          <div className="order-items">
            {cartItems.map((item, index) => {
              const productId = item.product || item._id;
              return (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${productId}`}>{item.name}</Link>
                  {item.prescriptionFile && (
                    <div className="cart-item-prescription-file">
                      <a 
                        href={item.prescriptionFile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Ver Receta Subida
                      </a>
                    </div>
                  )}
                  {item.prescription && item.prescription.pd && (
                    <div className="cart-item-prescription">
                      <p>
                        Graduación: OD SPH {item.prescription.sph.od}, OS SPH {item.prescription.sph.os}...
                      </p>
                    </div>
                  )}
                  <span>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="placeorder-summary">
        {/* --- COLUMNA DE RESUMEN --- */}
        <h2>Resumen del Pedido</h2>
        <div className="summary-item">
          <span>Artículos:</span>
          {/* 4. Mostramos las variables calculadas */}
          <span>${itemsPrice}</span>
        </div>
        <div className="summary-item">
          <span>Envío:</span>
          <span>${shippingPrice}</span>
        </div>
        <div className="summary-item">
          <span>Impuestos:</span>
          <span>${taxPrice}</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <button
          type="button"
          className="submit-btn"
          disabled={cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          Confirmar Pedido
        </button>
        {loading && <p>Procesando orden...</p>}
      </div>
    </div>
  );
};

export default PlaceOrderPage;