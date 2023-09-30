import React, { useState } from 'react';
import './Mazo.css'
import MazoEditDialog from './MazoEditDialog';



function Mazo({ id, nombre, imagenFondo}){
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
              <MazoEditDialog/>
            </div>
          )}
          
        </div>
        

      </div>
    )
}

export default Mazo;