
import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DeckList from './pages/DeckList';
import ListaCartas from './pages/ListaCartas';

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/deckList" element={<DeckList/>}/>
        <Route path="/listaCartas" element={<ListaCartas/>}/>
      </Routes>
    </BrowserRouter>


  );
}
export default App;

