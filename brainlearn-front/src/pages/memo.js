import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import './memo.css';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../http-common';

export default function Memo() {
  const [cartas, setCartas] = useState([]);
  const [verRespuesta, setVerRespuesta] = useState(false);
  const [cartaActual, setCartaActual] = useState(0);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCartas = async () => {
      try {
        const access = localStorage.getItem('access');
        const res = await http.get(`/memocartas/?deck_name=${name}`, {
          headers: {
            'Authorization': `Bearer ${access}`,
          },
        });
        console.log('Cartas obtenidas:', res.data);
        setCartas(res.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/home');
        } else {
          console.error('Error en la solicitud:', error);
          // Manejar otros posibles errores aquí
        }
      }
    };

    if (!localStorage.getItem('access')) {
      navigate('/home');
    } else {
      obtenerCartas();
    }
  }, [name, navigate]);

  const mostrarSiguienteCarta = () => {
    if (cartaActual < cartas.length - 1) {
      setCartaActual((prev) => prev + 1);
      setVerRespuesta(false); // Restablecer el estado de verRespuesta
    }else{
      navigate(`/mazo/${name}`);
    }
  };

  const handleClickRanking = async (ratingValue) => {
    try {
      const access = localStorage.getItem('access');
      const res = await http.put(`/cartas/${cartas[cartaActual]?.id}/`, {
        rating: ratingValue,
      }, {
        headers: {
          'Authorization': `Bearer ${access}`,
        },
      });

      // Actualizar el estado de cartas con la respuesta actualizada
      setCartas((prevCartas) => {
        const nuevasCartas = [...prevCartas];
        nuevasCartas[cartaActual] = res.data;
        return nuevasCartas;
      });
      console.log('Carta actualizada:', res.data);
      // Cambiar a la siguiente carta
      mostrarSiguienteCarta();

    } catch (error) {
      console.error('Error al actualizar el rating:', error);
      // Manejar el error según tus necesidades
    }
  };

  return (
    <>
      <NavBar />
      <div className='body_memo'>
      <div className='container_memo'>{verRespuesta ? cartas[cartaActual]?.answer : cartas[cartaActual]?.question}</div>

        {verRespuesta && (
          <div className='ranking_memo'>
            <button className='boton_ranking' style={{ backgroundColor: '#BD3B1B' }} onClick={() => handleClickRanking(1)}></button>
            <button className='boton_ranking' style={{ backgroundColor: '#D8A800' }} onClick={() => handleClickRanking(5)}></button>
            <button className='boton_ranking' style={{ backgroundColor: '#B6C61A' }} onClick={() => handleClickRanking(10)}></button>
          </div>
        )}

        {!verRespuesta && (
          <>
            <button className='boton' onClick={() => setVerRespuesta(true)}>
              Ver Respuesta
            </button>
          </>
        )}
      </div>
    </>
  );
}
