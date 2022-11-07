import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import BookDetails from './page/BookDetails';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
        <Route path='/BookDetails/:id' element={<BookDetails/>}/>
        <Route path='/BookDetails' element={<BookDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
