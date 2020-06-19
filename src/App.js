import React from 'react';
import './Resources/css/app.scss';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import 'firebase';
import Login from './components/auth/Login';
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';
import AdminMatches from './components/admin/matches/AdminMatches';
import AddEditMatch from './components/admin/matches/AddEditMatch';
import AdminPlayers from './components/admin/players/AdminPlayers';
import AddEditPlayer from './components/admin/players/AddEditPlayer';
import TheTeam from './components/theteam/TheTeam';

const App = ({ user }) => {

  return (
    <Router>
      <Header user={user} />
      <div className="App">
        <Switch>
          <PublicRoute user={user} restricted={false} exact path='/' component={Home} />
          <PublicRoute user={user} restricted={false} exact path='/the_team' component={TheTeam} />
          <PublicRoute user={user} restricted={true} exact path='/sign_in' component={Login} />

          <PrivateRoute user={user} exact path='/dashboard' component={Dashboard} />
          <PrivateRoute user={user} exact path='/admin_matches' component={AdminMatches} />
          <PrivateRoute user={user} exact path='/admin_matches/edit_match/:id?' component={AddEditMatch} />
          <PrivateRoute user={user} exact path='/admin_players' component={AdminPlayers} />
          <PrivateRoute user={user} exact path='/admin_players/add_player/:id?' component={AddEditPlayer} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
