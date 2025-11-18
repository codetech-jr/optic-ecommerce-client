import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

// Importamos los iconos de métodos de pago
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";

// Array de datos para las columnas del footer. Facilita la edición.
const footerLinks = [
  {
    title: 'Comprar',
    links: [
      { name: 'Gafas Graduadas', to: '/category/graduadas' },
      { name: 'Gafas de Sol', to: '/category/sol' },
      { name: 'Lentes de Contacto', to: '/category/lentillas' },
      { name: 'Ofertas', to: '/ofertas' },
    ]
  },
  {
    title: 'Sobre Nosotros',
    links: [
      { name: 'Nuestra Historia', to: '/about' },
      { name: 'Blog de Salud Visual', to: '/blog' },
      { name: 'Trabaja con Nosotros', to: '/careers' },
    ]
  },
  {
    title: 'Ayuda',
    links: [
      { name: 'Preguntas Frecuentes', to: '/faq' },
      { name: 'Contacta con nosotros', to: '/contact' },
      { name: 'Envíos y Devoluciones', to: '/shipping' },
      { name: 'Nuestra Garantía', to: '/warranty' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Términos y Condiciones', to: '/terms' },
      { name: 'Política de Privacidad', to: '/privacy' },
      { name: 'Política de Cookies', to: '/cookies' },
    ]
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Grid principal de enlaces */}
        <div className={styles.linksGrid}>
          {footerLinks.map((column) => (
            <div key={column.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={styles.linksList}>
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className={styles.link}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Barra inferior con copyright e iconos */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} ÓpticaClarity. Todos los derechos reservados.
          </p>
          <div className={styles.paymentIcons}>
            <FaCcVisa title="Visa" size={30} />
            <FaCcMastercard title="Mastercard" size={30} />
            <FaCcPaypal title="PayPal" size={30} />
            <FaCcAmex title="American Express" size={30} />
            {/* Puedes añadir un icono de candado SSL aquí si quieres */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;