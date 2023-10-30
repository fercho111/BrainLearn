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
        const nuevaListaDeMazos = await axios.get('http://localhost:8000/deckList/', { 
            headers: {
              'Authorization': `Bearer ${access}`,
          }
        });
        setDecks(nuevaListaDeMazos.data);
      } catch (error) {
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
            <div className="row">
                        <div className=" texto_cont_Deck">
                            <h1 className='textoC'>¡Bienvenido!</h1>
                            <h2 className='textoC'>Aqui podras crear tus mazos</h2>
                        </div>
                    </div>
                    <svg id="wave" style={{ transform: 'rotate(0deg)', transition: '0.3s' }} viewBox="0 0 1440 250" version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(230, 230, 235, 1)" offset="0%"></stop>
              <stop stopColor="rgba(230, 230, 235, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path style={{ transform: 'translate(0, 0px)', opacity: 1 }} fill="url(#sw-gradient-0)"
            d="M0,175L60,150C120,125,240,75,360,62.5C480,50,600,75,720,104.2C840,133,960,167,1080,150C1200,133,1320,67,1440,41.7C1560,17,1680,33,1800,41.7C1920,50,2040,50,2160,79.2C2280,108,2400,167,2520,195.8C2640,225,2760,225,2880,191.7C3000,158,3120,92,3240,91.7C3360,92,3480,158,3600,166.7C3720,175,3840,125,3960,108.3C4080,92,4200,108,4320,129.2C4440,150,4560,175,4680,170.8C4800,167,4920,133,5040,100C5160,67,5280,33,5400,41.7C5520,50,5640,100,5760,116.7C5880,133,6000,117,6120,120.8C6240,125,6360,150,6480,150C6600,150,6720,125,6840,95.8C6960,67,7080,33,7200,54.2C7320,75,7440,150,7560,179.2C7680,208,7800,192,7920,191.7C8040,192,8160,208,8280,216.7C8400,225,8520,225,8580,225L8640,225L8640,250L8580,250C8520,250,8400,250,8280,250C8160,250,8040,250,7920,250C7800,250,7680,250,7560,250C7440,250,7320,250,7200,250C7080,250,6960,250,6840,250C6720,250,6600,250,6480,250C6360,250,6240,250,6120,250C6000,250,5880,250,5760,250C5640,250,5520,250,5400,250C5280,250,5160,250,5040,250C4920,250,4800,250,4680,250C4560,250,4440,250,4320,250C4200,250,4080,250,3960,250C3840,250,3720,250,3600,250C3480,250,3360,250,3240,250C3120,250,3000,250,2880,250C2760,250,2640,250,2520,250C2400,250,2280,250,2160,250C2040,250,1920,250,1800,250C1680,250,1560,250,1440,250C1320,250,1200,250,1080,250C960,250,840,250,720,250C600,250,480,250,360,250C240,250,120,250,60,250L0,250Z"
            className="bottom-img"></path>
        </svg>
            <div className="body">
            
                
                    
                    <div className='container'>
                        <div className="row ">
                            <div className="col">
                                <MazoCrearDialog modal_title={"Crear Mazo"} className_icon="boton_crear
                                " submit_text="Crear" onSubmit={agregarMazo} />
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
        </>
    );
}

export default DeckList;
