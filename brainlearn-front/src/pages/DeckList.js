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

    return (
    <div className="container">
    <MazoDialog icon={icon()} modal_title={"Crear Mazo"} className_icon="boton_crear"/>
    <Mazo nombre="Fisica Mecanica"
    />
    </div>
    );
}
export default DeckList;
