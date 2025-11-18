// client/src/pages/CatalogPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard'; 
import Spinner from '../components/Spinner'; 
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Sidebar from '../components/Sidebar';
import './CatalogPage.css';

const CatalogPage = () => {
  const { keyword, pageNumber, category, brand } = useParams();
  const dispatch = useDispatch();
  const { products, page, pages, status, error } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, pageNumber, category, brand }));
  }, [dispatch, keyword, pageNumber, category, brand]);

  return (
    <div className="catalog-layout">
      <Sidebar />
      <main className="catalog-main">
        <h2>{keyword ? `Resultados para: ${keyword}` : 'Catálogo'}</h2>
        {status === 'loading' ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Paginate pages={pages} page={page} keyword={keyword || ''} category={category || ''} brand={brand || ''} />
          </>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;