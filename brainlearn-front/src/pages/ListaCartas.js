import React from 'react'
import Carta from '../components/Carta';
import CrearCartaDialog from '../components/CrearCartaDialog';

export default function ListaCartas() {
  return (
    <div className='container'>
        <CrearCartaDialog/>
        <Carta res="respuesta" pre="pregunta"/>
    </div>
  )
}
