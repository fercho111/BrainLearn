import Mazo from '../components/Mazo';
import './DeckList.css';
import { useState } from 'react';
import { IoMdAdd} from "react-icons/io";
import MazoDialog from '../components/MazoDialog';

function icon (){
    return(
        <IoMdAdd size={70}/>
    )
}

function DeckList() {
    const[decks, setDecks] = useState([]);
    console.log(decks);
    const agregarMazo = (deck) => {
        const decksActualizados = [...decks, deck];
        setDecks(decksActualizados);
    }

    return (
    <div className="container">
    <MazoDialog icon={icon()} modal_title={"Crear Mazo"} className_icon="boton_crear" submit_text="Crear" onSubmit={agregarMazo} />
    
    <div className="lista_decks">
        {decks.map((deck) => (
            <Mazo 
            
            titulo={deck.titulo}
            imagen={deck.imagen}
            />
        ))}
    </div>
    <Mazo/>
    </div>
    );
}
export default DeckList;
