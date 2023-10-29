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
                const res = await http.get('/deckList/', { 
                    headers: {
                      'Authorization': `Bearer ${access}`,
                    }
                  });
                setDecks(res.data);
            }
            obtenerDecks();
        } catch (error) {
            console.log(error);
        }

    }, []);

    const agregarMazo = async (deck) => {
        
        // axios post
        try {
            console.log(deck);
            const access = localStorage.getItem('access');
            const refresh = localStorage.getItem('refresh');
            const res = await axios.post('http://localhost:8000/deckList/', deck, { 
                headers: {
                  'Authorization': `Bearer ${access}`,
                }
            });
            const decksActualizados = [deck, ...decks];
            setDecks(decksActualizados);

        } catch (error){
            console.log(error);
        }
    };

    const eliminarMazo = async id => {
        try {
          // Envía la petición DELETE
          const access = localStorage.getItem('access');
          const refresh = localStorage.getItem('refresh');
          await axios.delete(`http://localhost:8000/mazos/${id}/`, { 
            headers: {
              'Authorization': `Bearer ${access}`,
            }
          });
          // Obtiene la lista actualizada de mazos desde la base de datos
          const nuevaListaDeMazos = await axios.get('http://localhost:8000/deckList', { 
            headers: {
              'Authorization': `Bearer ${access}`,
            }
        });
          setDecks(nuevaListaDeMazos.data);
        } catch (error) {
          console.log(error);
        }
    };
      

    const editarMazo = async (deck) => {
        try {
            // Envía la petición PUT al servidor para actualizar el mazo
            const access = localStorage.getItem('access');
            console.log(deck)
            const response = await axios.put(`http://localhost:8000/mazos/${deck.id}/`, deck, { 
                headers: {
                  'Authorization': `Bearer ${access}`,
                }
            });
    
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
            
            <div className="body">
            
                <div className="container" >
                    <div className="row">
                        <div className="col texto_cont">
                            <h1 className='textoC'>¡Bienvenido!</h1>
                            <h2 className='textoC'>Aqui podras crear tus mazos</h2>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="row ">
                            <div className="col">
                                <MazoCrearDialog modal_title={"Crear Mazo"} className_icon="boton_crear mazo" submit_text="Crear" onSubmit={agregarMazo} />
                                {decks.map((deck) => (
                                <Mazo
                                className="mazo"
                                key={deck.id}
                                id={deck.id}
                                titulo={deck.name}
                                // imagen={deck.imagen}
                                onEliminar={() => eliminarMazo(deck.id)}
                                onEditar={editarMazo}
                                />))};
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </>
    );
}

export default DeckList;
