import Mazo from '../components/Mazo';
import './DeckList.css';
import { useEffect, useState } from 'react';
import MazoCrearDialog from '../components/MazoCrearDialog';
import NavBar from '../components/Navbar';
import axios from 'axios';
import http from '../http-common'

function DeckList() {
    const[decks, setDecks] = useState(JSON.parse(localStorage.getItem('decks')) || []);
    useEffect(() => {
        try {
            const obtenerDecks = async () => {
                const access = localStorage.getItem('access');
                const refresh = localStorage.getItem('refresh');
                const res = http.get('/deckList/', { 
                    headers: {
                      'Authorization': `Bearer ${access}`,
                    }
                  });
                // descomentar este setDecks tira error
                console.log(res.data);
                // setDecks(res.data);
                
            }
            obtenerDecks();
        } catch(error) {
            console.log(error);
        }

    }, []);

    console.log(decks);
    const agregarMazo = async (deck) => {
        
        //axios post
        try {
            const res = await axios.post('http://localhost:8000/deckList/', deck);
            console.log(res);
            const decksActualizados = [deck, ...decks];
            setDecks(decksActualizados);

        } catch(error) {
            console.log(error);
        }
    };

    const eliminarMazo = async id => {
        try {
          // Envía la petición DELETE
          await axios.delete(`http://localhost:8000/deckList/${id}`);
          // Obtiene la lista actualizada de mazos desde la base de datos
          const nuevaListaDeMazos = await axios.get('http://localhost:8000/deckList');
    
          // Actualiza el estado local con la nueva lista
          setDecks(nuevaListaDeMazos.data);
        } catch (error) {
          console.log(error);
        }
      };
      

      const editarMazo = async (deck) => {
        try {
            // Envía la petición PUT al servidor para actualizar el mazo
            const response = await axios.put(`http://localhost:8000/deckList/${deck.id}`, deck);
    
            // Si la actualización es exitosa, actualiza el estado local
            if (response.status === 200) {
                const decksActualizados = decks.map((deckActual) => {
                    if (deckActual.id === deck.id) {
                        return deck;
                    }
                    return deckActual;
                });
                setDecks(decksActualizados);
            }
        } catch (error) {
            console.log(error);
        }
    };
    



    return (
        <>
            <NavBar/>
            <div className="texto_cont">
                <h1 className='textoC'>¡Bienvenido!</h1>
                <h2 className='textoC'>Aqui podras crear tus mazos</h2>
            </div>
            <div className="body">
            
                <div className="container" >
                    
                <MazoCrearDialog  modal_title={"Crear Mazo"} className_icon="boton_crear mazo" submit_text="Crear" onSubmit={agregarMazo} />
                    {decks.map((deck) => (
                        <Mazo className="mazo"
                        key={deck.id}
                        id={deck.id}
                        titulo={deck.name}
                        imagen={deck.imagen}
                        onEliminar={eliminarMazo}
                        onEditar={editarMazo}
                        
                        />
                    ))}

                </div>   
            </div>
        </>
    );
}

export default DeckList;