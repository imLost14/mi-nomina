import React, { useState, useEffect } from 'react';
import './inicio.css';

const Inicio = () => {
    const [saludo, setSaludo] = useState('');
    const [tiempo, setTiempo] = useState('');

    const getSaludo = () => {
      const hora = new Date().getHours();
      if (hora >= 0 && hora < 12) return 'Buenos días!';
      if (hora >= 12 && hora < 18) return 'Buenas tardes!';
      return 'Buenas noches!';
      };
      const updateTiempo = () => {
        const fecha = new Date();
        setTiempo(fecha.toLocaleTimeString());
        };
        useEffect(() => {
          setSaludo(getSaludo());
          updateTiempo();
          const intervalo = setInterval(updateTiempo, 1000);
          return () => clearInterval(intervalo);
        }, []);

  return (
    <div className='inicio text-center'>
      <h1 className='display-4'>{saludo}</h1>
      <h2 className="digital-clock">{tiempo}</h2>
    </div>
  )
}

export default Inicio
