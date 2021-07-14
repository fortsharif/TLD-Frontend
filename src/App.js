import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './login/Login'
import Application from './home/applications'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return <Router>

    <Route exact path="/">
      <Application></Application>
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </Router>
}

export default App;
