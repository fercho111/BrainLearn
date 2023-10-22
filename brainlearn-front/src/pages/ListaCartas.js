import React, { useEffect } from 'react'
import Carta from '../components/Carta';
import CrearCartaDialog from '../components/CrearCartaDialog';
import './ListaCartas.css';
import NavBar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ListaCartas() {
  const [cartas, setCartas] = useState([]);
  const {nombre} = useParams();


  const agregarCarta = async (carta) => {
    try{
      const res = await axios.post('http://localhost:8000/listaCartas/', carta);
      console.log(res);
      const cartasActualizadas = [carta, ...cartas];
      setCartas(cartasActualizadas);
    }catch(error){
      console.log(error);
    }
  }

  const eliminarCarta = async id => {
    try {
      // Envía la petición DELETE
      await axios.delete(`http://localhost:8000/listaCartas/${id}`);
      // Obtiene la lista actualizada de mazos desde la base de datos
      const nuevaListaDeCartas = await axios.get('http://localhost:8000/listaCartas');

      // Actualiza el estado local con la nueva lista
      setCartas(nuevaListaDeCartas.data);
    } catch (error) {
      console.log(error);
    }
  }

  const editarCarta = async (carta) => {
    try {
      // Envía la petición PUT al servidor para actualizar el mazo
      const response = await axios.put(`http://localhost:8000/listaCartas/${carta.id}`, carta);

      // Obtiene la lista actualizada de mazos desde la base de datos
      const nuevaListaDeCartas = await axios.get('http://localhost:8000/listaCartas');

      // Actualiza el estado local con la nueva lista
      setCartas(nuevaListaDeCartas.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <div >
      <NavBar/>
      <div className="body">
            
                <div className="container" >
                <h1 className="titulo">Lista de Cartas del Mazo {nombre}</h1>
                <CrearCartaDialog  modal_title={"Crear Carta"} className_icon="boton_crear mazo" submit_text="Crear" /* onSubmit={agregarMazo}*/ /> 
                    {cartas.map((carta) => (
                        <Carta className="carta"
                        key={carta.id}
                        id={carta.id}
                        res={carta.title}
                        pre={carta.imagen}
                        // onEliminar={eliminarMazo}
                        // onSubmit={editarMazo}
                        
                        />
                    ))}

                </div>   
            </div>
    </div>
  )
}
