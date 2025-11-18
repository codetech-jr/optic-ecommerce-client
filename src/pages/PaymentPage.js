// client/src/pages/PaymentPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/cartSlice';
import './LoginPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector((state) => state.cart);

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  // El estado inicial será el método guardado, o 'PayPal' por defecto
  const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="form-container">
      <h1>Método de Pago</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Selecciona Método</label>

          {/* --- OPCIÓN 1: PAYPAL --- */}
          <div className="radio-group">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal">PayPal o Tarjeta de Crédito</label>
          </div>

          {/* --- OPCIÓN 2: BINANCE (LA NUEVA) --- */}
          <div className="radio-group">
            <input
              type="radio"
              id="Binance"
              name="paymentMethod"
              value="Binance"
              checked={paymentMethod === 'Binance'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Binance">Pagar con Binance Pay</label>
          </div>

        </div>
        <button type="submit" className="submit-btn">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;