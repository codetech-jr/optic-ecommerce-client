// client/src/components/layout/ServicesDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

// Usaremos los mismos estilos que ya añadimos a Header.module.css
import styles from '../Header.module.css';

const ServicesDropdown = ({ isOpen }) => {
  return (
    // El componente recibe 'isOpen' como una prop y aplica la clase condicionalmente
    <div className={`${styles.dropdownMenu} ${isOpen ? styles.isOpen : ''}`}>
      <Link to="/servicios/examen-visual" className={styles.dropdownLink}>
        Examen Visual Completo
      </Link>
      <Link to="/servicios/salud-ocular" className={styles.dropdownLink}>
        Salud Ocular y Prevención
      </Link>
      <Link to="/servicios/adaptacion-lentillas" className={styles.dropdownLink}>
        Adaptación de Lentes de Contacto
      </Link>
      <Link to="/servicios/asesoramiento-estilo" className={styles.dropdownLink}>
        Asesoramiento de Estilo
      </Link>
      <div className={styles.dropdownDivider}></div>
      <Link to="/pedir-cita" className={styles.dropdownCta}>
        Pedir Cita Online
      </Link>
    </div>
  );
};

export default ServicesDropdown;