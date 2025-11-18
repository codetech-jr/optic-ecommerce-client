// client/src/components/HomePageSections/CuratedCollection.js
import React from 'react';

// 1. Importaciones de Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// 2. Importaciones de CSS de Swiper (¡MUY IMPORTANTE!)
import 'swiper/css';
import 'swiper/css/navigation';
// 3. Iconos y estilos locales
import { FaStar, FaRegHeart } from "react-icons/fa";
import styles from './CuratedCollection.module.css';

import clubmasterImg from '../../assets/images/clubmaster.png';
import holbrookImg from '../../assets/images/holbrook.png';
import po3019sImg from '../../assets/images/po3019s.png';
import ft0237Img from '../../assets/images/ft0237.png';
import pr17wsImg from '../../assets/images/pr17ws.png';

// DATOS DE EJEMPLO - En un caso real, esto vendría de una API
const curatedProducts = [
    { id: 1, brand: 'Ray-Ban', name: 'Clubmaster Classic', price: '165,00 $', rating: 5, image: clubmasterImg },
    { id: 2, brand: 'Oakley', name: 'Holbrook', price: '142,00 $', rating: 4, image: holbrookImg },
    { id: 3, brand: 'Persol', name: 'PO3019S', price: '250,00 $', rating: 5, image: po3019sImg },
    { id: 4, brand: 'Tom Ford', name: 'FT0237 Snowdon', price: '320,00 $', rating: 5, image: ft0237Img },
    { id: 5, brand: 'Prada', name: 'PR 17WS', price: '280,00 $', rating: 4, image: pr17wsImg },
];

// Un pequeño componente helper para renderizar las estrellas
const StarRating = ({ rating }) => (
  <div className={styles.ratingContainer}>
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? 'var(--color-accent)' : 'var(--color-border-soft)'} />
    ))}
  </div>
);


const CuratedCollection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Los Más Deseados de la Temporada
        </h2>
      </div>

      {/* El contenedor del carrusel necesita el padding global para los botones */}
      <div className={`${styles.container} ${styles.swiperContainer}`}>
        <Swiper
          // 4. Módulos que vamos a usar
          modules={[Navigation]}
          // Controles de navegación
          navigation={true}
          // Espacio entre slides
          spaceBetween={30}
          // Responsive Breakpoints
          breakpoints={{
            // Cuando la pantalla es >= 640px
            640: {
              slidesPerView: 2,
            },
            // Cuando la pantalla es >= 768px
            768: {
              slidesPerView: 3,
            },
            // Cuando la pantalla es >= 1024px
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper" // Puedes usar esta clase si necesitas más overrides
        >
          {curatedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                  <button className={styles.likeButton} aria-label="Añadir a favoritos">
                    <FaRegHeart size={20} />
                  </button>
                </div>
                <div className={styles.detailsContainer}>
                  <p className={styles.brand}>{product.brand}</p>
                  <h3 className={styles.name}>{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <p className={styles.price}>{product.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CuratedCollection;