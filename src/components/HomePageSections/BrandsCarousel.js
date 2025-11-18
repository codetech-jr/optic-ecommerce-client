// client/src/components/HomePageSections/BrandsCarousel.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BrandsCarousel.module.css';

// Importa los logos de tus marcas (asegúrate de que sean SVG o PNG de buena calidad)
import logoRayBan from '../../assets/logos/rayban-logo.png';
import logoOakley from '../../assets/logos/oakley-logo.png';
import logoPersol from '../../assets/logos/persol-logo.png';
import logoVogue from '../../assets/logos/vogue-eyewear-logo.png';
import logoPrada from '../../assets/logos/prada-logo.png';
import logoDior from '../../assets/logos/dior-logo.png';
import logoGucci from '../../assets/logos/gucci-logo.png';

const brands = [
  { name: 'Ray-Ban', logo: logoRayBan, link: '/brand/ray-ban' },
  { name: 'Oakley', logo: logoOakley, link: '/brand/oakley' },
  { name: 'Persol', logo: logoPersol, link: '/brand/persol' },
  { name: 'Vogue', logo: logoVogue, link: '/brand/vogue' },
  { name: 'Prada', logo: logoPrada, link: '/brand/prada' },
  { name: 'Dior', logo: logoDior, link: '/brand/dior' },
  { name: 'Gucci', logo: logoGucci, link: '/brand/gucci' },
];

const BrandsCarousel = () => {
  // Duplicamos el array para el efecto de carrusel infinito
  const extendedBrands = [...brands, ...brands];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Trabajamos con las Mejores Marcas</h2>
      
      <div className={styles.carouselContainer}>
        <div className={styles.carouselTrack}>
          {extendedBrands.map((brand, index) => (
            <Link to={brand.link} key={`${brand.name}-${index}`} aria-label={`Ver productos de ${brand.name}`}>
              <img 
                src={brand.logo} 
                alt={`Logo de ${brand.name}`} 
                className={styles.brandLogo} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;