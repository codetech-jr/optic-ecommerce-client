// client/src/pages/ShippingPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/cartSlice';
// Reutilizaremos los estilos de LoginPage
import './LoginPage.css';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtenemos la dirección del estado por si el usuario ya la había introducido antes
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    // Despachamos la acción para guardar la dirección en Redux y localStorage
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment'); // Llevamos al usuario al siguiente paso
  };

  return (
    <div className="form-container">
      <h1>Dirección de Envío</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label>Dirección</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Ciudad</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Código Postal</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>País</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;