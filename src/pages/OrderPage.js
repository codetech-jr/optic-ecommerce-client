// client/src/pages/OrderPage.js
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/orderSlice';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import './PlaceOrderPage.css'; // Reutilizamos los estilos

const OrderPage = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    // Si no hay orden o si el ID de la orden no coincide con el de la URL, la buscamos
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, order]);

  // --- SOLUCIÓN DEL ERROR ---
  // 1. Definimos la función auxiliar fuera de la condición de modificación
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  // 2. Calculamos el precio en una variable LOCAL (itemsPrice) en lugar de modificar order.itemsPrice
  let itemsPrice = 0;

  if (!loading && !error && order) {
    itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  if (loading) return <Spinner />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!order) return <Message variant="info">Orden no encontrada</Message>;

  return (
    <div className="placeorder-container">
      <h1>Orden #{order._id}</h1>
      <div className="placeorder-details">
        {/* --- DETALLES DE ENVÍO Y PAGO --- */}
        <h2>Dirección de Envío</h2>
        <p><strong>Nombre: </strong> {order.user?.name}</p>
        <p><strong>Email: </strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a></p>
        <p>
          <strong>Dirección: </strong>
          {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </p>

        <hr />
        <h2>Método de Pago</h2>
        <p><strong>Método: </strong>{order.paymentMethod}</p>

        <hr />
        <h2>Artículos del Pedido</h2>
        {order.orderItems.length === 0 ? (
          <Message>Tu orden está vacía</Message>
        ) : (
          <div className="order-items">
            {order.orderItems.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{item.qty} x ${item.price} = ${item.qty * item.price}</span>

                {/* --- DETALLES DE GRADUACIÓN --- */}
                {item.prescription && item.prescription.pd && (
                  <div className="item-prescription-details">
                    <strong>Graduación:</strong>
                    <ul>
                      <li>OD: Esfera {item.prescription.sph.od}, Cilindro {item.prescription.cyl.od}, Eje {item.prescription.axis.od}</li>
                      <li>OS: Esfera {item.prescription.sph.os}, Cilindro {item.prescription.cyl.os}, Eje {item.prescription.axis.os}</li>
                      <li>PD: {item.prescription.pd} mm</li>
                      {item.prescription.add.od && <li>Adición: OD {item.prescription.add.od}, OS {item.prescription.add.os}</li>}
                    </ul>
                  </div>
                )}

                {item.prescriptionFile && (
                  <div className="cart-item-prescription-file">
                    <a href={item.prescriptionFile} target="_blank" rel="noopener noreferrer">
                      Ver Receta Subida
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="placeorder-summary">
        {/* --- RESUMEN DE PRECIOS --- */}
        <h2>Resumen del Pedido</h2>
        <div className="summary-item">
          <span>Artículos:</span>
          {/* 3. Usamos la variable 'itemsPrice' en lugar de 'order.itemsPrice' */}
          <span>${itemsPrice}</span>
        </div>
        <div className="summary-item">
          <span>Envío:</span>
          <span>${order.shippingPrice}</span>
        </div>
        <div className="summary-item">
          <span>Impuestos:</span>
          <span>${order.taxPrice}</span>
        </div>
        <div className="summary-item total">
          <span>Total:</span>
          <span>${order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;