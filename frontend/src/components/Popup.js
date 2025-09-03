import React from 'react';

const Popup = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#222',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px #000',
      zIndex: 1000
    }}>
      <p>{message}</p>
      <button onClick={onClose} style={{ padding: '5px 10px', marginTop: '10px' }}>Fechar</button>
    </div>
  );
};

export default Popup;
