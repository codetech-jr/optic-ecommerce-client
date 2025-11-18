// client/src/components/HomePageSections/FeaturedCategories.js (Modificado)
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FeaturedCategories.module.css';

// CAMBIA ESTAS IMÁGENES POR LAS QUE CORRESPONDAN
import imgMujer from '../../assets/images/slide-2.jpg'; 
import imgHombre from '../../assets/images/fashion-man.jpg';
import imgLentillas from '../../assets/images/slide-3.jpg';
import imgOfertas from '../../assets/images/slide-1.jpg';

const FeaturedCategories = () => {
  // Nueva estructura de datos para los segmentos
  const segments = [
    {
      title: 'Colección Mujer',
      actionText: 'Comprar para Ella',
      img: imgMujer,
      link: '/products/woman' // <-- Ajusta tus rutas
    },
    {
      title: 'Colección Hombre',
      actionText: 'Comprar para Él',
      img: imgHombre,
      link: '/products/man'
    },
    {
      title: 'Lentes de Contacto',
      actionText: 'Pedir Lentillas',
      img: imgLentillas,
      link: '/category/Lentes%20de%20Contacto'
    },
    {
      title: 'Ofertas Especiales',
      actionText: 'Ver Descuentos',
      img: imgOfertas,
      link: '/ofertas'
    }
  ];

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Para Cada Estilo, Una Mirada
        </h2>

        {/* El grid ahora se renderiza con la nueva data */ }
        <div className={styles.grid}>
          {segments.map((segment) => (
            <Link 
              to={segment.link} 
              key={segment.title} 
              className={styles.segmentCard}
            >
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${segment.img})` }}
              ></div>

              {/* El overlay de gradiente mejora la legibilidad */}
              <div className={styles.cardOverlay}></div>

              {/* El contenido ahora está anidado dentro de un div para controlarlo mejor */}
              <div className={styles.cardContent}>
                <div> {/* Div extra para agrupar título y acción */}
                  <h3 className={styles.cardTitle}>{segment.title}</h3>
                  <span className={styles.cardAction}>{segment.actionText}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;