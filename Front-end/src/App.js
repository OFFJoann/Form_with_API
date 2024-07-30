// App.js
import React from 'react';
import './styles/formulario.css';
import Routes from './components/Routes';
import Footer from './components/footer';
import Header from './components/Header';
import Start from './components/emergentes/Modal';



const App = () => {
  return (
    <div className="App">
      <Header />
      <Start />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
