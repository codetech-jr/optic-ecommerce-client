// client/src/pages/AboutPage.js
import React from 'react';
import { Link } from 'react-router-dom';

// Importa los estilos y los iconos que necesitarás
import styles from './AboutPage.module.css';
import { FaRegEye, FaCertificate, FaHandHoldingHeart } from "react-icons/fa";

// Importa las imágenes que usarás en la página
import heroImage from '../assets/images/slide-1.jpg';
import storyImage from '../assets/images/slide-2.jpg';

// Datos para la sección de valores
const ourValues = [
  {
    icon: <FaRegEye className={styles.valueIcon} />,
    title: 'Pasión por la Salud Visual',
    description: 'No solo vendemos gafas. Somos profesionales de la óptica dedicados a cuidar la salud de tus ojos con la tecnología más avanzada.'
  },
  {
    icon: <FaCertificate className={styles.valueIcon} />,
    title: 'Calidad Certificada',
    description: 'Seleccionamos a mano cada montura y trabajamos con los mejores laboratorios para garantizar productos duraderos y de máxima calidad.'
  },
  {
    icon: <FaHandHoldingHeart className={styles.valueIcon} />,
    title: 'Atención Personalizada',
    description: 'Creemos que cada cliente es único. Te ofrecemos un trato cercano y un asesoramiento honesto para que encuentres exactamente lo que necesitas.'
  }
];

const AboutPage = () => {
  return (
    <>
      {/* --- SECCIÓN 1: HERO --- */}
      <section className={styles.hero} style={{ backgroundImage: `url(${heroImage})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Más que una óptica.</h1>
          <p className={styles.heroSubtitle}>Somos tu aliado para una visión clara y con estilo.</p>
        </div>
      </section>

      {/* --- SECCIÓN 2: NUESTRA HISTORIA --- */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <h2 className={styles.storyTitle}>Nuestra Historia</h2>
            <p>
              ÓpticaClarity nació de un sueño simple: combinar la atención profesional de una óptica tradicional con la comodidad y la variedad del mundo online.
            </p>
            <p>
              Fundada en 2023 por un equipo de ópticos con más de 20 años de experiencia, nuestra misión es hacer que el cuidado visual de alta calidad sea accesible para todos, sin sacrificar el estilo ni la atención al detalle.
            </p>
          </div>
          <div>
            <img src={storyImage} alt="El equipo de ÓpticaClarity" className={styles.storyImage} />
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: NUESTROS VALORES --- */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesContainer}>
          <h2 className={styles.valuesTitle}>Lo Que Nos Mueve</h2>
          <div className={styles.valuesGrid}>
            {ourValues.map(value => (
              <div key={value.title} className={styles.valueItem}>
                {value.icon}
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 4: CALL TO ACTION --- */}
      <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>¿Listo para ver el mundo con claridad?</h2>
          <p className={styles.ctaText}>
            Explora nuestras colecciones y descubre cómo podemos ayudarte a encontrar tus gafas perfectas.
          </p>
          <Link to="/productos" className={styles.ctaButton}>Explorar Productos</Link>
      </section>
    </>
  );
};

export default AboutPage;