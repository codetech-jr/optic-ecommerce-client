import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Importa los nuevos estilos y el icono
import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      // Mantenemos tu lógica original de redirigir a la home si está vacío
      navigate('/');
    }
  };

  return (
    // 2. Usamos el <form> como contenedor principal con nuestra clase
    <form onSubmit={submitHandler} className={styles.searchForm}>
      {/* 3. Aplicamos la clase al input */}
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword} // Controlamos el valor del input
        placeholder="Buscar productos..."
        className={styles.searchInput}
      />
      {/* 4. El botón ahora contiene un icono y tiene sus propias clases */}
      <button type="submit" className={styles.searchButton} aria-label="Buscar">
        <FaSearch className={styles.searchIcon} />
      </button>
    </form>
  );
};

export default SearchBox;