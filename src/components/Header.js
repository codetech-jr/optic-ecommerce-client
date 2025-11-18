// client/src/components/Header.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import SearchBox from './SearchBox';
import styles from './Header.module.css'; // Asegúrate de que esta ruta sea correcta

// Importamos el MegaMenu ubicado en `components/layout/MegaMenu.js`
import MegaMenu from './layout/MegaMenu';
// Componente dropdown para la sección Servicios
import ServicesDropdown from './layout/ServicesDropdown';
import OffersDropdown from './layout/OffersDropdown';

// Iconos
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { HiBars3, HiXMark } from 'react-icons/hi2';

const Header = () => {
  // --- TODA TU LÓGICA PERMANECE EXACTAMENTE IGUAL ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Estado para controlar el Mega Menu
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  // Estado para controlar el dropdown de Servicios
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOffersMenuOpen, setIsOffersMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
    closeAllMenus();
  };
  
  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setIsMegaMenuOpen(false); // también cerramos el mega menú
    setIsServicesMenuOpen(false);
    setIsOffersMenuOpen(false);
  }

  // Handlers para abrir / cerrar el MegaMenu
// --- Handlers actualizados para que cada menú cierre a los otros ---
  const handleProductsEnter = () => {
    setIsServicesMenuOpen(false);
    setIsOffersMenuOpen(false);
    setIsMegaMenuOpen(true);
  }
  
  const handleServicesEnter = () => {
    setIsMegaMenuOpen(false);
    setIsOffersMenuOpen(false);
    setIsServicesMenuOpen(true);
  }

  const handleOffersEnter = () => {
    setIsMegaMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsOffersMenuOpen(true);
  }

  const handleMenuLeave = () => {
    setIsMegaMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsOffersMenuOpen(false);
  }

  return (
  // Contenedor principal del header, añadimos onMouseLeave para más robustez
  <header className={styles.header} onMouseLeave={handleMenuLeave}>
      <div className={styles.container}>
        
        {/* --- HIJO DIRECTO 1: Logo --- */}
        <div className="flex-shrink-0">
          <Link to="/" onClick={closeAllMenus} className={styles.logo}>
            Óptica<span>Clarity</span>
          </Link>
        </div>

        {/* --- CORRECCIÓN: La navegación de escritorio ahora es un HIJO DIRECTO del container --- */}
        {/* --- para que flexbox pueda distribuirla correctamente. --- */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            {/* El li de Productos abre el MegaMenu al hacer hover */}
            <li className={styles.menuItem} onMouseEnter={handleProductsEnter}>
              <Link to="/productos" className={styles.navLink}>Productos</Link>
            </li>
            <li className={styles.menuItem} onMouseEnter={handleServicesEnter}>
              <Link to="/servicios" className={styles.navLink}>Servicios</Link>
              <ServicesDropdown isOpen={isServicesMenuOpen} />
            </li>
                        {/* --- NUEVO: Elemento de Ofertas con su dropdown visual --- */}
            <li className={styles.menuItem} onMouseEnter={handleOffersEnter}>
              <Link to="/ofertas" className={styles.navLink}>Ofertas</Link>
              <OffersDropdown isOpen={isOffersMenuOpen} />
            </li>
            <li><Link to="/about" className={styles.navLink}>Quiénes Somos</Link></li>
            <li><Link to="/contacto" className={styles.navLink}>Contacto</Link></li>
          </ul>
        </nav>
        
        {/* --- HIJO DIRECTO 3: Acciones (agrupa escritorio y móvil) --- */}
        {/* --- CORRECCIÓN: Agrupamos todas las acciones en un único bloque a la derecha. --- */}
        {/* --- El CSS se encargará de mostrar u ocultar la versión de escritorio o móvil. --- */}
        <div>
          {/* Bloque de Acciones de Escritorio */}
          <div className={styles.userActionsDesktop}>
            <SearchBox />
            
            <Link to="/cart" className={styles.cartLink}>
              <FaShoppingCart className={styles.cartIcon} />
              {cartItemCount > 0 && (
                <span className={styles.badge}>{cartItemCount}</span>
              )}
            </Link>
            
            {userInfo ? (
              <div style={{ position: 'relative' }}> {/* Contenedor para posicionar el dropdown */}
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={styles.profileButton}>
                  <FaUserCircle className={styles.profileIcon} />
                  <span>{userInfo.name.split(' ')[0]}</span>
                </button>
                {isProfileOpen && (
                  <div className={styles.profileDropdown}>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className={styles.dropdownLink}>Perfil</Link>
                    {userInfo.isAdmin && (
                      <>
                        <div className={styles.dropdownDivider}></div>
                        <Link to="/admin/userlist" onClick={() => setIsProfileOpen(false)} className={styles.dropdownLink}>Usuarios</Link>
                        <Link to="/admin/productlist" onClick={() => setIsProfileOpen(false)} className={styles.dropdownLink}>Productos</Link>
                        <Link to="/admin/orderlist" onClick={() => setIsProfileOpen(false)} className={styles.dropdownLink}>Pedidos</Link>
                      </>
                    )}
                     <div className={styles.dropdownDivider}></div>
                    <button onClick={logoutHandler} className={styles.dropdownButton}>Salir</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={styles.loginButton}>
                Iniciar Sesión
              </Link>
            )}
          </div>
          
          {/* Bloque de Acciones de Móvil */}
          <div className={styles.mobileActions}>
            <Link to="/cart" className={styles.cartLink}>
              <FaShoppingCart className={styles.cartIcon} />
              {cartItemCount > 0 && (
                <span className={styles.badge}>{cartItemCount}</span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton} aria-label="Abrir menú">
              <HiBars3 className={styles.mobileMenuIcon} />
            </button>
          </div>
        </div>

      </div>

  {/* Renderizamos el MegaMenu fuera del container pero dentro del header */}
  <MegaMenu isOpen={isMegaMenuOpen} handleMouseLeave={handleMenuLeave} />

  {/* --- Panel Desplegable Móvil (Sin cambios) --- */}
      <div 
        className={`${styles.mobilePanelOverlay} ${isMenuOpen ? styles.isOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div 
        className={`${styles.mobilePanel} ${isMenuOpen ? styles.isOpen : ''}`}
      >
        <div className={styles.mobilePanelHeader}>
          <h2 className={styles.mobilePanelTitle}>Menú</h2>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
            <HiXMark className={styles.mobilePanelCloseIcon} />
          </button>
        </div>
        <div className={styles.mobilePanelBody}>
          <SearchBox />
          <nav className={styles.mobileNav}>
            <Link to="/products/graduadas" onClick={closeAllMenus} className={styles.mobileNavLink}>Gafas Graduadas</Link>
            <Link to="/products/sol" onClick={closeAllMenus} className={styles.mobileNavLink}>Gafas de Sol</Link>
            <Link to="/products/lentes-contacto" onClick={closeAllMenus} className={styles.mobileNavLink}>Lentes de Contacto</Link>
            <div className={styles.mobileNavDivider}>
              {userInfo ? (
                <>
                  <Link to="/profile" onClick={closeAllMenus} className={styles.mobileNavLink}>Mi Cuenta</Link>
                  {userInfo.isAdmin && (
                    <div className={styles.mobileAdminLinks}>
                      <Link to="/admin/userlist" onClick={closeAllMenus} className={styles.mobileAdminLink}>Admin: Usuarios</Link>
                      <Link to="/admin/productlist" onClick={closeAllMenus} className={styles.mobileAdminLink}>Admin: Productos</Link>
                      <Link to="/admin/orderlist" onClick={closeAllMenus} className={styles.mobileAdminLink}>Admin: Pedidos</Link>
                    </div>
                  )}
                  <button onClick={logoutHandler} className={styles.mobileLogoutButton}>Salir</button>
                </>
              ) : (
                <Link to="/login" onClick={closeAllMenus} className={styles.mobileNavLink}>Iniciar Sesión</Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;