import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './login/Login'
import Application from './home/applications'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return <Router>
    <Switch>
      <Route exact path="/">
        <Application />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
}

export default App;
