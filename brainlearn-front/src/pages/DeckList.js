import Mazo from '../components/Mazo';
import './DeckList.css';
import { useState } from 'react';
import MazoCrearDialog from '../components/MazoCrearDialog';
import NavBar from '../components/Navbar';




function DeckList() {
    const[decks, setDecks] = useState(JSON.parse(localStorage.getItem('decks')) || []);
    console.log(decks);
    const agregarMazo = (deck) => {
        const decksActualizados = [deck, ...decks];
        setDecks(decksActualizados);
        localStorage.setItem('decks', JSON.stringify(decksActualizados));
    }

    const eliminarMazo = id => {
        const decksActualizados = decks.filter(deck => deck.id !== id);
        setDecks(decksActualizados);
        localStorage.setItem('decks', JSON.stringify(decksActualizados));
    };

    const editarMazo = (deck) => {
        const decksActualizados = decks.map((deckActual) => {
            if (deckActual.id === deck.id) {
                return deck;
            }
            return deckActual;
        });
        setDecks(decksActualizados);
        localStorage.setItem('decks', JSON.stringify(decksActualizados));
    };


    return (
        <div className="body">
            <NavBar/>
            <div className="texto">
                <h1>¡Bienvenido!</h1>
                <h2>Aqui podras crear tus mazos</h2>
            </div>

            
        </div>
    );
}
export default DeckList;
{/* <div className="container" >
            <MazoCrearDialog  modal_title={"Crear Mazo"} className_icon="boton_crear mazo" submit_text="Crear" onSubmit={agregarMazo} />
                {decks.map((deck) => (
                    <Mazo className="mazo"
                    key={deck.id}
                    id={deck.id}
                    titulo={deck.title}
                    imagen={deck.imagen}
                    onEliminar={eliminarMazo}
                    onSubmit={editarMazo}
                    
                    />
                ))}

            </div> */}