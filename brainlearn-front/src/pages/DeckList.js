import Mazo from '../components/Mazo';
import './DeckList.css';
import { useState } from 'react';
import MazoCrearDialog from '../components/MazoCrearDialog';



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

    return (
    <div className="container" >
    <MazoCrearDialog  modal_title={"Crear Mazo"} className_icon="boton_crear mazo" submit_text="Crear" onSubmit={agregarMazo} />
        {decks.map((deck) => (
            <Mazo className="mazo"
            key={deck.id}
            id={deck.id}
            titulo={deck.title}
            imagen={deck.imagen}
            onEliminar={eliminarMazo}
            
            />
        ))}

    </div>
    );
}
export default DeckList;
