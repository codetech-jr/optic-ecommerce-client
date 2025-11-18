// client/src/pages/admin/ProductListPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
// --- CAMBIO 1: Importar del archivo correcto y añadir el 'reset' ---
import { deleteProduct, createProduct, productCreateReset } from '../../redux/productAdminSlice';
import './UserListPage.css'; // Reutilizamos los estilos

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.productList);
  const { userInfo } = useSelector((state) => state.user);

  // --- CAMBIO 2: Apuntar a los nuevos slices en el store ---
  const { success: successDelete } = useSelector((state) => state.productDelete);
  const { success: successCreate, product: createdProduct } = useSelector((state) => state.productCreate);


  useEffect(() => {
    // --- CAMBIO 3: Resetear el estado de 'crear producto' al cargar la página ---
    // Esto evita un bucle de redirección si volvemos a esta página después de crear un producto.
    dispatch(productCreateReset());

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      dispatch(deleteProduct(id));
    }
  };
  
  const createProductHandler = () => {
    // La acción createProduct ahora espera recibir los datos del producto
    // Para la creación simple, podemos pasar un objeto vacío y que el backend ponga los valores por defecto
    dispatch(createProduct({})); 
  };

  return (
    <div className="userlist-container">
      <div className="userlist-header">
        <h1>Productos</h1>
        <button onClick={createProductHandler} className="create-btn">
          Crear Producto
        </button>
      </div>
      {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : (
        <table className="userlist-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>CATEGORÍA</th>
              <th>MARCA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(product => ( // <-- Añadida comprobación por si products es undefined
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className="actions-cell">
                  <button onClick={() => navigate(`/admin/product/${product._id}/edit`)}>Editar</button>
                  <button onClick={() => deleteHandler(product._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListPage;