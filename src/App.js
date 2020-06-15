import React from 'react';
import './Resources/css/app.scss';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import 'firebase';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

const App = ({ user }) => {

  return (
    <Router>
      <Header />
      <div className="App">
        <Switch>
          <PublicRoute user={user} restricted={false} exact path='/' component={Home} />
          <PublicRoute user={user} restricted={true} exact path='/sign_in' component={Login} />

          <PrivateRoute user={user} exact path='/dashboard' component={Dashboard} />

          <Redirect from="*" to="/" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
