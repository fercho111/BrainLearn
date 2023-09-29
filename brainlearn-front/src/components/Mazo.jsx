import React, { useState } from 'react';
import { BiEdit } from "react-icons/bi";
import './Mazo.css'

function Mazo({ id, nombre, imagen, cartas}){
    const [hovered, setHovered] = useState(false);
    return(
      <div 
        className="mazo"
        // style={{backgroundImage: `url(${imagenFondo})`}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mazo_texto">
          <p>{nombre}</p>
          {hovered && (
            <div className='botones_mazo'>
              <button className='boton_start'>START</button>
              <button className="boton_edit"><BiEdit /></button>
            </div>
          )}
        </div>

      </div>
    )
}

export default Mazo;