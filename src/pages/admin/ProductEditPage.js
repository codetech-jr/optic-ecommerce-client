// client/src/pages/admin/ProductEditPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/productSlice';
import { updateProduct, productUpdateReset } from '../../redux/productAdminSlice';
// Reutiliza los estilos del login para el formulario
import '../LoginPage.css';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  // Hemos quitado rating y numReviews ya que no se editan manualmente
  // const [rating, setRating] = useState(0);
  // const [numReviews, setNumReviews] = useState(0);

  const { selectedProduct: product, selectedProductStatus: status, selectedProductError: error } = useSelector((state) => state.productList);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset());
      navigate('/admin/productlist');
    } else {
      if (!product || product._id !== productId) {
        dispatch(fetchProductById(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        // El nombre del campo en el modelo era 'stock', no 'countInStock'
        setCountInStock(product.stock); 
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      stock: countInStock, // Asegúrate de que el nombre del campo coincida con el backend
      description,
    }));
  };

  return (
    <div className="form-container">
      <Link to="/admin/productlist" className="back-link">Volver a la lista</Link>
      <h1>Editar Producto</h1>
      {loadingUpdate && <p>Actualizando...</p>}
      {errorUpdate && <p className="error-message">{errorUpdate}</p>}
      
      {status === 'loading' ? (
        <p>Cargando datos del producto...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <form onSubmit={submitHandler}>
          
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Introduce el nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              type="number"
              placeholder="Introduce el precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Imagen</label>
            <input
              type="text"
              placeholder="Introduce la URL de la imagen"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Marca</label>
            <input
              type="text"
              placeholder="Introduce la marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              placeholder="Introduce el stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <input
              type="text"
              placeholder="Introduce la categoría"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              placeholder="Introduce la descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <button type="submit" className="submit-btn">Actualizar</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditPage;