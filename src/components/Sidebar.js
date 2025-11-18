// client/src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Corregido con un guion

const Sidebar = () => {
  const navigate = useNavigate();

const handleFilter = (filterType, value) => {
  navigate(`/${filterType}/${value}`);
};

  return (
    <aside>
      <h3>Categorías</h3>
      <ul>
        <li onClick={() => handleFilter('category', 'Gafas de Sol')}>Gafas de Sol</li>
        <li onClick={() => handleFilter('category', 'Gafas Graduadas')}>Gafas Graduadas</li>
      </ul>
      <h3>Marcas</h3>
      <ul>
        <li onClick={() => handleFilter('brand', 'OptiStyle')}>OptiStyle</li>
        <li onClick={() => handleFilter('brand', 'VisionArt')}>VisionArt</li>
      </ul>
    </aside>
  );
};

export default Sidebar;