// src/components/HeroSection.js

import React from 'react';
// Importamos nuestros estilos
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    // Aplicamos nuestra clase principal y mantenemos el `style` para la imagen
    // ¡Asegúrate de que esta ruta sea correcta o cámbiala por una de tus imágenes!
    <section 
      className={styles.heroSection}
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop')" }} 
    >
      {/* Overlay para mejorar la legibilidad del texto */}
      <div className={styles.overlay}></div>

      {/* Contenido */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>
          La calidad que tus ojos merecen. <br /> El estilo que buscas.
        </h1>
        <p className={styles.subtitle}>
          Gafas de diseño con cristales de alta tecnología. Pruébatelas virtualmente y encuentra tu montura perfecta.
        </p>

        {/* Botones de Llamada a la Acción (CTA) */}
        <div className={styles.ctaContainer}>
          <a href="/products/graduadas" className={`${styles.ctaButton} ${styles.ctaPrimary}`}>
            Ver Gafas Graduadas
          </a>
          <a href="/products/sol" className={`${styles.ctaButton} ${styles.ctaSecondary}`}>
            Explorar Gafas de Sol
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;