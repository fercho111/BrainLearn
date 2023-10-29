import React, { useEffect } from 'react'
import Carta from '../components/Carta';
import CrearCartaDialog from '../components/CrearCartaDialog';
import './ListaCartas.css';
import NavBar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import http from '../http-common'


export default function ListaCartas() {
  const [cartas, setCartas] = useState([]);
  const {name} = useParams();

  useEffect(() => {
    try {
        const obtenerCartas = async () => {
            const access = localStorage.getItem('access');
            const refresh = localStorage.getItem('refresh');
            const res = await http.get(`/cartas/?deck_name=${name}`, { 
                headers: {
                  'Authorization': `Bearer ${access}`,
                }
              });
            setCartas(res.data);
        }
        obtenerCartas();
    } catch (error) {
        console.log(error);
    }
  }, []);

  const agregarCarta = async (carta) => {
    try {
      const access = localStorage.getItem('access');
      const res = await axios.post('http://localhost:8000/listaCartas/', carta, {
        headers: {
        'Authorization': `Bearer ${access}`,
      }});
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
    <>
      <NavBar/>
      <div className="row row-listaCarta">
        
        <div className="texto_cont">
          <div>
            <h1 className='textoC'>Mazo: {name}</h1>
            <h2 className='textoC'>Estas son tus cartas</h2>
        
         </div>
        
        </div>
        <div className="row mb-4 row-comenzar">
          <Link to="/Memo" className="comenzar">Comenzar</Link>
        </div>
            <div className='body'>
                <div className="container " >
                <div className="row">
                <CrearCartaDialog  modal_title={"Crear Carta"} className_icon="boton_crear_carta" submit_text="Crear" onSubmit={agregarCarta} deck_name={name} /> 
                    {cartas.map((carta) => (
                        <Carta className="carta"
                        key={carta.id}
                        id={carta.id}
                        res={carta.answer}
                        pre={carta.question}
                        // onEliminar={eliminarMazo}
                        // onSubmit={editarMazo}
                        
                        />
                    ))}
                </div>
                </div>   
                </div>
      </div>
    </>
  )
}
