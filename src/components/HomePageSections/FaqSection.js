// client/src/components/HomePageSections/FaqSection.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './FaqSection.module.css';
import { FaPlus } from "react-icons/fa";

// Preguntas Frecuentes para la Homepage (las más importantes)
const faqData = [
  {
    question: '¿Qué pasa si las gafas no me quedan bien?',
    answer: '¡No hay problema! Ofrecemos devoluciones gratuitas y sin complicaciones durante 30 días. Queremos que estés 100% satisfecho con tu compra. Visita nuestra página de devoluciones para más información.'
  },
  {
    question: '¿Cuánto tiempo tardará en llegar mi pedido?',
    answer: 'Los pedidos con solo montura se envían en 24-48 horas. Para gafas con graduación, el proceso de fabricación y montaje de los cristales toma de 3 a 5 días hábiles antes del envío. Recibirás un correo con el seguimiento en cuanto salgan de nuestro laboratorio.'
  },
  {
    question: '¿Necesito mi receta o graduación para comprar?',
    answer: 'Sí, para gafas graduadas necesitas una receta válida. Puedes introducir los valores manualmente durante el proceso de compra o subir una foto de tu receta. Si prefieres, también puedes hacer el pedido y enviárnosla por correo más tarde.'
  },
  {
    question: '¿De qué materiales están hechos vuestros cristales?',
    answer: 'Utilizamos cristales orgánicos de alta calidad con un índice de 1.56 como estándar. Todos nuestros cristales incluyen tratamientos antirreflejante, anti-rayaduras y protección UV total sin coste adicional.'
  }
];

const FaqSection = () => {
  // Estado para saber qué índice del acordeón está abierto
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    // Si el índice clicado ya está abierto, lo cerramos (poniendo el estado a null)
    // Si no, lo abrimos (poniendo el estado al nuevo índice)
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Preguntas Frecuentes</h2>
        <div className={styles.faqList}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => handleToggle(index)}
              >
                <span>{item.question}</span>
                <FaPlus className={`${styles.faqIcon} ${openIndex === index ? styles.isOpen : ''}`} />
              </button>
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.isOpen : ''}`}>
                <div className={styles.answerContent}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/faqs" className={styles.ctaLink}>
          ¿Tienes más preguntas? Visita nuestra página de FAQs &rarr;
        </Link>
      </div>
    </section>
  );
};

export default FaqSection;