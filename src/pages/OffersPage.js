// client/src/pages/OffersPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OffersPage.module.css';

// Importa las imágenes
import mainBannerImg from '../assets/images/gafas-sol.png';
import twoForOneImg from '../assets/images/monturas-2x1.png';
import outletImg from '../assets/images/novedad.png';
import aviadorimg from '../assets/images/aviador.png';
import kyotoimg from '../assets/images/kyoto.png';

// DATOS DE EJEMPLO. Esto vendría de tu API/backend.
const featuredProducts = [
    { id: 1, name: 'Gafa Aviador Clásica', brand: 'OptiStyle', oldPrice: 89.99, newPrice: 59.99, salePercent: '33%', image: aviadorimg, link: '/product/gafa-aviador' },
    { id: 2, name: 'Montura Redonda "Kyoto"', brand: 'VisionArt', oldPrice: 110.0, newPrice: 77.0, salePercent: '30%', image: kyotoimg, link: '/product/montura-kyoto' },
    // ... más productos ...
];

const OffersPage = () => {
  return (
    <>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Ofertas y Promociones</h1>
        <p className={styles.pageSubtitle}>
          Descubre descuentos increíbles en monturas, gafas de sol y lentes de contacto. ¡La oportunidad perfecta para renovar tu estilo!
        </p>
      </header>
      
      <main className={styles.mainContent}>
        <div className={styles.container}>
        
          {/* SECCIÓN 1: BANNER DE LA OFERTA PRINCIPAL */}
          <section className={styles.mainOfferBanner}>
            <img src={mainBannerImg} alt="Descuentos en gafas de sol" className={styles.bannerImage}/>
            <div className={styles.bannerOverlay}></div>
            <div className={styles.bannerContent}>
              <h2 className={styles.bannerTitle}>Hasta -50% en Gafas de Sol</h2>
              <p className={styles.bannerText}>
                Adelántate al verano con nuestra selección de gafas de sol de las mejores marcas. Protección y estilo al mejor precio.
              </p>
              <Link to="/ofertas/sol-50-off" className={styles.bannerButton}>Ver Selección</Link>
            </div>
          </section>
          
          {/* SECCIÓN 2: GRID DE OTRAS OFERTAS */}
          <section className={styles.secondaryOffersGrid}>
              <Link to="/ofertas/2x1-monturas" className={styles.offerCard} style={{backgroundImage: `url(${twoForOneImg})`}}>
                  <div className={styles.bannerOverlay}></div>
                  <div className={styles.bannerContent}>
                      <h3>2x1 en Monturas</h3>
                      <span>Descubrir &rarr;</span>
                  </div>
              </Link>
              <Link to="/outlet" className={styles.offerCard} style={{backgroundImage: `url(${outletImg})`}}>
                  <div className={styles.bannerOverlay}></div>
                  <div className={styles.bannerContent}>
                      <h3>Outlet - Últimas Unidades</h3>
                      <span>¡Hasta -70%!</span>
                  </div>
              </Link>
          </section>

          {/* SECCIÓN 3: LISTADO DE PRODUCTOS DESTACADOS EN OFERTA */}
          <section className={styles.featuredProductsSection}>
              <h2 className={styles.sectionTitle}>Productos Destacados en Oferta</h2>
              <div className={styles.productsGrid}>
                  {featuredProducts.map(product => (
                      <Link to={product.link} key={product.id} className={styles.productCard}>
                          <div className={styles.imageContainer}>
                              <img src={product.image} alt={product.name} className={styles.productImage} />
                              <span className={styles.saleBadge}>-{product.salePercent}</span>
                          </div>
                          <div className={styles.detailsContainer}>
                              <p className={styles.brand}>{product.brand}</p>
                              <h3 className={styles.name}>{product.name}</h3>
                              <div className={styles.priceContainer}>
                                  <span className={styles.newPrice}>{product.newPrice.toFixed(2)} €</span>
                                  <s className={styles.oldPrice}>{product.oldPrice.toFixed(2)} €</s>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default OffersPage;