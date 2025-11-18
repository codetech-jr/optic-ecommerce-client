// client/src/components/layout/MegaMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MegaMenu.module.css';

// Importa aquí tu imagen destacada
import featuredImage from '../../assets/images/slide-1.jpg'; 

const megaMenuData = {
    graduadas: { title: "Gafas Graduadas", links: [ { name: "Ver Todas", to: "/category/graduadas"}, { name: "Hombre", to: "/category/graduadas/hombre" }, { name: "Mujer", to: "/category/graduadas/mujer" } ] },
    sol: { title: "Gafas de Sol", links: [ { name: "Ver Todas", to: "/category/sol"}, { name: "Hombre", to: "/category/sol/hombre" }, { name: "Mujer", to: "/category/sol/mujer" }, { name: "Polarizadas", to: "/category/sol/polarizadas" }] },
    lentillas: { title: "Lentes de Contacto", links: [ { name: "Ver Todas", to: "/category/lentillas"}, { name: "Diarias", to: "/category/lentillas/diarias" }, { name: "Mensuales", to: "/category/lentillas/mensuales" }] },
    otros: { title: "Otros", links: [ { name: "Gafas Infantiles", to: "/category/infantil"}, { name: "Accesorios", to: "/category/accesorios" }] },
}

const MegaMenu = ({ isOpen, handleMouseLeave }) => {
  return (
    // Aplicamos la clase .isOpen condicionalmente
    <div 
        className={`${styles.megaMenu} ${isOpen ? styles.isOpen : ''}`}
        onMouseLeave={handleMouseLeave}
    >
        <div className={styles.container}>
            <div className={styles.grid}>
                {Object.values(megaMenuData).map(column => (
                    <div key={column.title} className={styles.column}>
                        <Link to={column.links[0].to}><h3 className={styles.columnTitle}>{column.title}</h3></Link>
                        <ul className={styles.linksList}>
                            {column.links.map(link => (
                                <li key={link.name}>
                                    <Link to={link.to} className={styles.link}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                
                <div className={styles.imageColumn}>
                    <Link to="/novedades">
                        <div className={styles.imageWrapper}>
                           <img src={featuredImage} alt="Novedades" className={styles.image}/>
                           <div className={styles.imageCaption}>
                               <strong>Nueva Colección</strong>
                               <span>Ver ahora &rarr;</span>
                           </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MegaMenu