// import logo from './logo.svg';
import './App.css';
import { Login } from './Paginas/Login';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NovoUsuario } from './Paginas/NovoUsuario';
import { Home } from './Paginas/Home';
import { Temperatura } from './Paginas/Temperatura';
import { Umidade } from './Paginas/Umidade';
import { Luminosidade } from './Paginas/Luminosidade';
import { Sensores } from './Paginas/Sensores';
import { Contador } from './Paginas/Contador';
import { EnviarArquivos } from './Paginas/EnviarArquivos';
import { VisualizacaoDados } from './Paginas/VisualizacaoDados';
import { SensoresCriacao } from './Paginas/SensoresCriacao';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Temperatura' element={<Temperatura/>}/>
        <Route path='/Umidade' element={<Umidade/>}/>
        <Route path='/Luminosidade' element={<Luminosidade/>}/>
        <Route path='/Sensores' element={<Sensores/>}/>
        <Route path='/Contador' element={<Contador/>}/>
        <Route path='/EnviarArquivos' element={<EnviarArquivos />}/>
        <Route path='/Novousuario' element={<NovoUsuario />}/>
        <Route path='/VisualizacaoDados' element={<VisualizacaoDados/>}/>
        <Route path='/SensoresCriacao' element={<SensoresCriacao />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
