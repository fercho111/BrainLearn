
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import DeckList from './pages/DeckList';
import ListaCartas from './pages/ListaCartas';
import Memo from './pages/Memo';

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
        <Route path="/memo" element={<Memo/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

