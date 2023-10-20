import React from 'react'
import Carta from '../components/Carta';
import CrearCartaDialog from '../components/CrearCartaDialog';
import './ListaCartas.css';
import NavBar from '../components/Navbar';
import { useState } from 'react';


export default function ListaCartas() {
  const [cartas, setCartas] = useState([]);

  return (
    <div >
      <NavBar/>
      <div className="body">
            
                <div className="container" >
                    
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
