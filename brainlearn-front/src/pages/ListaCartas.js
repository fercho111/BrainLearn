import React from 'react'
import Carta from '../components/Carta';
import CrearCartaDialog from '../components/CrearCartaDialog';
import './ListaCartas.css';
import NavBar from '../components/Navbar';


export default function ListaCartas() {
  return (
    <div >
      <NavBar/>
      <div className='container'>
          <CrearCartaDialog/> 
          <Carta res="respuesta" pre="pregunta"/>
      </div>
    </div>
  )
}
