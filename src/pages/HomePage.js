// client/src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

// Importa las secciones y componentes
import HeroSection from '../components/HomePageSections/HeroSection';
import FeaturedCategories from '../components/HomePageSections/FeaturedCategories';
import TrustBar from '../components/HomePageSections/TrustBar';
import CuratedCollection from "../components/HomePageSections/CuratedCollection";
import SimplifiedProcess from "../components/HomePageSections/SimplifiedProcess";
import SocialProofGrid from "../components/HomePageSections/SocialProofGrid";
import BrandsCarousel from '../components/HomePageSections/BrandsCarousel';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Container from '../components/Container'; // Importante importar el Container
import FaqSection from '../components/HomePageSections/FaqSection';

const HomePage = () => {
  const { keyword, pageNumber, category, brand } = useParams();
  const dispatch = useDispatch();

  const { products, page, pages, status, error } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(fetchProducts({ keyword, pageNumber, category, brand }));
  }, [dispatch, keyword, pageNumber, category, brand]);

  const isHomePage = !keyword && !pageNumber && !category && !brand;

  return (
    // Usamos un Fragment (<>) para devolver múltiples elementos a nivel raíz
    <>
      {/* FÍJATE BIEN: La HeroSection está FUERA del Container. Se renderiza solo si es la homepage. */}
      {isHomePage && <HeroSection />}
      
      {/* Ahora, abrimos un Container que centrará TODO el resto del contenido. */}
      <Container>
        {isHomePage ? (
          // --- VISTA DE LA PÁGINA DE INICIO ---
          <>
            <TrustBar />
            <FeaturedCategories />
            <CuratedCollection />
            <SimplifiedProcess />
            <SocialProofGrid />
            <BrandsCarousel />
            <FaqSection />
            {/* <h2 className="my-12 text-3xl font-bold text-center">Los Más Vendidos</h2>
            {status === 'loading' ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )} */}
          </>
        ) : (
          // --- VISTA DE CATÁLOGO / BÚSQUEDA / FILTROS ---
          <>
            <h2 className="mb-6 text-2xl font-bold">{keyword ? `Resultados para: ${keyword}` : 'Catálogo'}</h2>
            {status === 'loading' ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
              <>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;