// client/src/components/HomePageSections/SocialProofGrid.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SocialProofGrid.module.css';

import imgAviador from '../../assets/images/mujer-aviador.png';
import imgDeportiva from '../../assets/images/hombre-gafas-deportivas.png';
import imgWindsor from '../../assets/images/mujer-montura-windsor.png';
import imgCateye from '../../assets/images/cateye-vintage.png';
import imgPolarizada from '../../assets/images/gafas-sol-polarizadas.png';
import imgTitanio from '../../assets/images/monturas-titanio.png';


// DATOS DE EJEMPLO. Esto vendría de tu CMS o una API
// La propiedad 'layout' nos ayuda a crear el mosaico dinámicamente
const communityPosts = [
  { id: 1, imageUrl: imgAviador, userHandle: '@sofia_reads', productName: 'Modelo Aviador Clásico', productLink: '/product/aviador', layout: 'tall' },
  { id: 2, imageUrl: imgDeportiva, userHandle: '@javier_explorer', productName: 'Gafa Deportiva RX', productLink: '/product/deportiva-rx' },
  { id: 3, imageUrl: imgWindsor, userHandle: '@urbanstyle', productName: 'Montura Windsor', productLink: '/product/windsor' },
  { id: 4, imageUrl: imgCateye, userHandle: '@elena_designs', productName: 'Estilo Cateye Vintage', productLink: '/product/cateye', layout: 'tall' },
  { id: 5, imageUrl: imgPolarizada, userHandle: '@marie_v', productName: 'Gafa de Sol Polarizada', productLink: '/product/polarizada' },
  { id: 6, imageUrl: imgTitanio, userHandle: '@cafeconlibros', productName: 'Montura de Titanio', productLink: '/product/titanio' },
];

const SocialProofGrid = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuestra Comunidad, Vuestro Estilo</h2>
        <p className={styles.subtitle}>
          Mira cómo nuestros clientes combinan sus monturas favoritas en su día a día.
          Inspírate y comparte tu look con el hashtag #OpticaClarity.
        </p>
        
        <div className={styles.grid}>
          {communityPosts.map((post) => (
            <div 
              key={post.id}
              // Asignamos la clase 'tall' dinámicamente si está en los datos
              className={`${styles.gridItem} ${post.layout === 'tall' ? styles.tall : ''}`}
            >
              <img src={post.imageUrl} alt={`Foto de ${post.userHandle} usando ${post.productName}`} className={styles.gridImage} />
              <div className={styles.overlay}>
                <div className={styles.productInfo}>
                  <p className={styles.userHandle}>{post.userHandle}</p>
                  <Link to={post.productLink} className={styles.productName}>
                    Ver: {post.productName} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Link to="/comunidad" className={styles.ctaButton}>
            Muestra tu Estilo
        </Link>
      </div>
    </section>
  );
};

export default SocialProofGrid;