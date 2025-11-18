// client/src/components/HomePageSections/SimplifiedProcess.js
import React from 'react';

// 1. Iconos para cada paso. He elegido algunos de react-icons, siéntete libre de cambiarlos.
import { LuGlasses, LuFileScan, LuPackageCheck } from "react-icons/lu";

// 2. Importamos los estilos del módulo
import styles from './SimplifiedProcess.module.css';

// 3. Array de datos para los pasos. Esto hace el código JSX mucho más limpio.
const processSteps = [
  {
    icon: <LuGlasses className={styles.stepIcon} />,
    title: '1. Elige tu Estilo',
    description: 'Explora cientos de monturas y usa nuestro probador virtual para encontrar tu look perfecto.'
  },
  {
    icon: <LuFileScan className={styles.stepIcon} />,
    title: '2. Añade tu Graduación',
    description: 'Súbela con una foto, ingrésala manualmente o, si prefieres, nos la puedes enviar más tarde.'
  },
  {
    icon: <LuPackageCheck className={styles.stepIcon} />,
    title: '3. Recibe la Perfección',
    description: 'Fabricamos tus cristales a medida con la última tecnología y los enviamos directos a tu casa.'
  }
];

const SimplifiedProcess = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Comprar Gafas Online Nunca Fue Tan Fácil</h2>
        <p className={styles.subtitle}>
          En ÓpticaClarity, hemos simplificado cada paso para que tu experiencia sea rápida, segura y completamente satisfactoria.
        </p>
        
        <div className={styles.grid}>
          {processSteps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.iconContainer}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimplifiedProcess;