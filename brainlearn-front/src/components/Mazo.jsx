import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mazo.css'
import MazoEditDialog from './MazoEditDialog';
import { AiFillDelete} from "react-icons/ai";



function Mazo({ id, nombre,imagen, onEliminar, onEditar}){
    const [hovered, setHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState(imagen);
    const [name, setName] = useState (nombre);
    
    const navigate = useNavigate();

    const handleImageSelect = (newImage) => {
      setSelectedImage(newImage);
    }

    const handlenameChange = (newname) => {
      if(newname !== '')
      setName(newname);
    }
    
    const handleStart = () => {
      navigate(`/deckList/${nombre}`);
    }
    


    return(
      <div 
        className="mazo"
        style={{ backgroundImage: `url(${selectedImage})` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button className='boton_delete_mazo' onClick={() => onEliminar(id)}><AiFillDelete/></button>
        <div className="mazo_texto">
          <p>{name}</p>
          {hovered && (
            
            <div className='botones_mazo'>
              <button className='boton_start' onClick={ handleStart }>START</button>
              <MazoEditDialog className_icon="boton_edit_mazo"  modal_name={"Editar Mazo"}onImageSelect={handleImageSelect} onnameChange={handlenameChange} submit_text="Editar" />
              
            </div>
          )}
          
        </div>
        

      </div>
    )
}

export default Mazo;