import React from 'react';
import './Resources/css/app.scss';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import 'firebase';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign_in' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
