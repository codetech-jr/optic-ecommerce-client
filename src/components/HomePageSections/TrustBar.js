// client/src/components/HomePageSections/TrustBar.js
import React from 'react';

// 1. Importa los estilos de nuestro módulo CSS
import styles from './TrustBar.module.css';

// Importa los iconos específicos que necesitas de react-icons
import { TbTruckDelivery } from "react-icons/tb";
import { RiShieldCheckLine, RiChatQuoteLine, RiCameraLensLine } from "react-icons/ri";

// El array de datos se mantiene exactamente igual
const trustFeatures = [
  {
    Icon: TbTruckDelivery,
    text: 'Envío y Devolución Gratis',
  },
  {
    Icon: RiChatQuoteLine,
    text: 'Asesoramiento Óptico',
  },
  {
    Icon: RiShieldCheckLine,
    text: 'Compra Segura y Garantizada',
  },
  {
    Icon: RiCameraLensLine,
    text: 'Probador Virtual',
  },
];

const TrustBar = () => {
  return (
    // Contenedor principal con nuestra clase base
    <div className={styles.trustBar}>
      <h2 className={styles.title}>Compra con Confianza</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {trustFeatures.map((feature, index) => (
            // Contenedor de cada item
            <div key={index} className={styles.featureItem}>
              {/* 
                Renderizamos el icono y le pasamos su clase específica.
                El efecto hover sobre .featureItem afectará al icono gracias al CSS que escribimos.
              */}
              <feature.Icon className={styles.featureIcon} />
              
              <span className={styles.featureText}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;