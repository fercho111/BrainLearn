import React, { useState } from 'react';
import './Mazo.css'
import MazoDialog from './MazoDialog';
import { BiEdit} from "react-icons/bi";

function icon(){
  return(
    <BiEdit/>
  )
}

function Mazo({ id, id_user, titulo, imagen}){
    const [hovered, setHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imagen);
    const [title, setTitle] = useState (titulo);
    

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
              <MazoDialog  className_icon="boton_edit" icon={icon()} modal_title={"Editar Mazo"}onImageSelect={handleImageSelect} onTitleChange={handleTitleChange} submit_text="Editar"/>
            </div>
          )}
          
        </div>
        

      </div>
    )
}

export default Mazo;