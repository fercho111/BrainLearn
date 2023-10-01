import React, { useState } from 'react';
import './Mazo.css'
import MazoEditDialog from './MazoEditDialog';


function Mazo({ id, nombre, imagenFondo}){
    const [hovered, setHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imagenFondo);
    const [title, setTitle] = useState(nombre);
    

    const handleImageSelect = (newImage) => {
      setSelectedImage(newImage);
    }

    const handleTitleChange = (newTitle) => {
      if(newTitle != '')
      setTitle(newTitle);
    }

    return(
      <div 
        className="mazo"
        style={{ backgroundImage: `url(${selectedImage})` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mazo_texto">
          <p>{title}</p>
          {hovered && (
            <div className='botones_mazo'>
              <button className='boton_start'>START</button>
              <MazoEditDialog onImageSelect={handleImageSelect} onTitleChange={handleTitleChange}/>
            </div>
          )}
          
        </div>
        

      </div>
    )
}

export default Mazo;