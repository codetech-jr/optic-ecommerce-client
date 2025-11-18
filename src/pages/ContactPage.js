// client/src/pages/ContactPage.js
import React, { useState } from 'react';
import styles from './ContactPage.module.css';

// Importa iconos para la sección de información
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactPage = () => {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica para enviar el formulario a un backend,
    // a un servicio como EmailJS, o simplemente mostrar un mensaje de éxito.
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    // Reseteamos el formulario
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* --- Encabezado de la Página --- */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contáctanos</h1>
        <p className={styles.pageSubtitle}>
          ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte.
          Rellena el formulario o utiliza una de nuestras vías de contacto directo.
        </p>
      </header>
      
      {/* --- Contenido Principal --- */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* Columna de la Izquierda: Información de Contacto */}
            <div className={styles.infoColumn}>
              <h2 className={styles.infoColumnTitle}>Información Directa</h2>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <h4>Nuestra Ubicación</h4>
                  <p>Calle Falsa 123, Springfield, SP 12345</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaPhoneAlt className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <h4>Teléfono y WhatsApp</h4>
                  <p><a href="tel:+34000000000">(+34) 000 000 000</a></p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <FaEnvelope className={styles.infoIcon} />
                <div className={styles.infoText}>
                  <h4>Correo Electrónico</h4>
                  <p><a href="mailto:contacto@opticaclarity.com">contacto@opticaclarity.com</a></p>
                </div>
              </div>
            </div>

            {/* Columna de la Derecha: Formulario de Contacto */}
            <div className={styles.formColumn}>
              <form onSubmit={submitHandler}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Nombre Completo</label>
                  <input type="text" id="name" name="name" value={name} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={email} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>Asunto</label>
                  <input type="text" id="subject" name="subject" value={subject} onChange={handleChange} required className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Tu Mensaje</label>
                  <textarea id="message" name="message" value={message} onChange={handleChange} required className={styles.textarea}></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;