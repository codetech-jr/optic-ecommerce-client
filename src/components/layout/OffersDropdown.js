// client/src/components/layout/OffersDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

// Importa una imagen promocional para las ofertas
import offersImage from '../../assets/images/slide-2.jpg';

const OffersDropdown = ({ isOpen }) => {
  return (
    <div className={`${styles.dropdownMenu} ${styles.offersDropdown} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.offersGrid}>
        {/* Columna de la izquierda: Enlaces */}
        <div className={styles.offersLinks}>
          <h4>Explorar Ofertas</h4>
          <ul className={styles.linksList}>
            <li><Link to="/ofertas" className={styles.link}>Ver Todas las Ofertas</Link></li>
            <li><Link to="/ofertas/2x1-monturas" className={styles.link}>2x1 en Monturas</Link></li>
            <li><Link to="/ofertas/sol-50-off" className={styles.link}>Hasta -50% en Gafas de Sol</Link></li>
            <li><Link to="/ofertas/lentillas" className={styles.link}>Descuento en Lentillas</Link></li>
            <li><Link to="/outlet" className={styles.link}>Outlet (Últimas Unidades)</Link></li>
          </ul>
        </div>

        {/* Columna de la derecha: Imagen Promocional */}
        <div className={styles.offersImageColumn}>
          <Link to="/ofertas/sol-50-off">
            <img src={offersImage} alt="Rebajas en Gafas de Sol" className={styles.offersImage} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OffersDropdown;