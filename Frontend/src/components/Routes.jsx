import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Formulario from './Formulario';
import FormularioP2 from './FormularioP2';
import FormularioP3 from './FormularioP3';
import FormularioP4 from './FormularioP4'

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Formulario} />
      <Route path="/Form2" component={FormularioP2} />
      <Route path="/Form3" component={FormularioP3} />
      <Route path="/Form4" component={FormularioP4} />
    </Switch>
  );
};

export default Routes;