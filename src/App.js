import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './login/Login'
import Applications from './applications/Applications'
import Dashboard from './dashboard/Dashboard'
import CreateApplication from './create/CreateApplication'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return <Router>
    <Switch>
      <Route exact path="/applications" component={Applications} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create" component={CreateApplication} />
    </Switch>
  </Router>
}

export default App;
