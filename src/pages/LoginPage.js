// client/src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/userSlice';
import Container from '../components/Container'; // <-- 1. Importa Container

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const { loading, error, userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    // <-- 2. Envuelve todo el contenido en el Container -->
    <Container>
      <div className="max-w-md mx-auto"> {/* Usamos Tailwind para centrar el formulario */}
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p>Cargando...</p>}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Nuevo cliente? <Link to="/register" className="text-indigo-600">Regístrate</Link>
        </p>
      </div>
    </Container>
  );
};

export default LoginPage;