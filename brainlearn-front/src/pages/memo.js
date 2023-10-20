import React from 'react'
import NavBar from '../components/NavbarHome'
import './memo.css'
import { useState } from 'react';

export default function Memo() {
    const [verRespuesta, setVerRespuesta] = useState(false);
    const handleClickVerRespuesta = () => {
        setVerRespuesta(true);
    }
    return (
        <>
          <div className='body_memo'>
            <div className='container container_memo'>
              {verRespuesta ? 'Respuesta' : 'Pregunta'}
            </div>
    
            {verRespuesta && (
              <div className='ranking_memo'>
                <button className='boton_ranking' style={{ backgroundColor: '#BD3B1B' }}></button>
                <button className='boton_ranking' style={{ backgroundColor: '#D8A800' }}></button>
                <button className='boton_ranking' style={{ backgroundColor: '#B6C61A' }}></button>
              </div>
            )}
    
            {!verRespuesta && (
                <button className='boton'onClick={handleClickVerRespuesta}>Ver Respuesta</button>
            )}

            
          </div>
        </>
      )
    
}
