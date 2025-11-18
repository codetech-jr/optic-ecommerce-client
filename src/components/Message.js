// client/src/components/Message.js
import React from 'react';
import './Message.css';

const Message = ({ variant = 'info', children }) => {
  // El className será 'message' y además la clase de la variante (ej: 'message danger')
  return <div className={`message ${variant}`}>{children}</div>;
};

export default Message;