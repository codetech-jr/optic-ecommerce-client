// client/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Usaremos Link para la navegación
import './ProductCard.css'; // Importaremos nuestro propio CSS

// Recibimos el objeto 'product' como prop
const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-img" />
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`} className="card-title-link">
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <p className="card-brand">{product.brand}</p>
        <h4 className="card-price">${product.price}</h4>
      </div>
    </div>
  );
};

export default ProductCard;