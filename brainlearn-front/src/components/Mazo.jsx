import React, { useState } from 'react';
import './Mazo.css'
import MazoEditDialog from './MazoEditDialog';
import { AiFillDelete} from "react-icons/ai";


function Mazo({ id, id_user, titulo, imagen, onEliminar, onEditar}){
    const [hovered, setHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imagen);
    const [title, setTitle] = useState (titulo);
    

    const handleImageSelect = (newImage) => {
      setSelectedImage(newImage);
    }

    const handleTitleChange = (newTitle) => {
      if(newTitle !== '')
      setTitle(newTitle);
    }

    


    return(
      <div 
        className="mazo"
        style={{ backgroundImage: `url(${selectedImage})` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button className='boton_delete' onClick={() => onEliminar(id)}><AiFillDelete/></button>
        <div className="mazo_texto">
          <p>{title}</p>
          {hovered && (
            
            <div className='botones_mazo'>
              <button className='boton_start'>START</button>
              <MazoEditDialog className_icon="boton_edit"  modal_title={"Editar Mazo"}onImageSelect={handleImageSelect} onTitleChange={handleTitleChange} submit_text="Editar" />
              
            </div>
          )}
          
        </div>
        

      </div>
    )
}

export default Mazo;