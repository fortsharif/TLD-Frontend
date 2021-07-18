import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './login/Login'
import Applications from './applications/Applications'
import Application from './application/Application'
import Dashboard from './dashboard/Dashboard'
import CreateApplication from './create/CreateApplication'
import NavBar from './navbar/NavBar'
import Register from './register/Register'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {

  return <Router>
    <Route component={NavBar} />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/applications" component={Applications} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/" component={Login} />
      <Route exact path="/create" component={CreateApplication} />
      <Route exact path="/myapplication" component={Application} />
    </Switch>
  </Router>
}

export default App;
