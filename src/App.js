import {Route, Switch} from 'react-router-dom'

import './App.css'

import NotFound from './components/NotFound'
import Home from './components/Home'
import Login from './components/Login'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
