import React from 'react'
import { useState } from 'react'
import EditCartaDialog from './EditCartaDialog';
import { AiFillDelete} from "react-icons/ai";
import './Carta.css';

export default function Carta({res, pre,imgRespuesta, imgPregunta,id}) {
  const [flip, setFlip] = useState(false);
  const [respuesta, setRespuesta] = useState(res);
  const [pregunta, setPregunta] = useState(pre);
  const [imagenRespuesta, setImagenRespuesta] = useState(imgRespuesta);
  const [imagenPregunta, setImagenPregunta] = useState(imgPregunta);

  const handleImagePregunta = (newImgPre) => {
    setImagenPregunta(newImgPre);
  }

  const handleImageRespuesta = (newImgRes) => {
    setImagenRespuesta(newImgRes);
  }
  const handlePregunta = (newPreg) => {
    setPregunta(newPreg);
  }

  const handleRespuesta = (newResp) => {
    setRespuesta(newResp);
  }


  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{
        backgroundImage: flip ? `url(${imagenRespuesta})` : `url(${imagenPregunta})`
      }}
    >
    <div className='botones-carta'>
      <EditCartaDialog          className_icon="boton_edit"  modal_title=   {"Editar Carta"}onImagePregunta=  {handleImagePregunta} 
      onImageRespuesta={handleImageRespuesta} 
      onPregunta={handlePregunta}
      onRespuesta={handleRespuesta}
      submit_text="Editar" 
      /> 
      <button className='boton_delete' ><AiFillDelete/></button>
    </div>
    {flip ?(
      <div className="back">
        <p>{respuesta}</p>
      </div>
    ) : (
      <div className="front">
        <p>{pregunta}</p>
      </div>
    )};
    <button className='boton_flip' onClick={() => setFlip(!flip)}>Flip</button>
    </div>
  )
}