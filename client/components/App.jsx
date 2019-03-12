import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

import Home from './home/Home'
// import Header from './Header'
import SignIn from './SignIn'
import Register from './Register'
import Profile from './Profile'
import Events from './events/Events'
// import ErrorMessage from './ErrorMessage'
import Registration from './Registration'

const App = () => {
  // TODO: Style the ErrorMessage
  return (
    <Router>
      <div>
        {/* <Route path='/' component={Header} /> */}
        {/* <Route path='/' component={ErrorMessage} /> */}
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/signin' component={SignIn} />
        <Route path='/profile' component={Profile} />
        <Route path='/events' component={Events} />
        <Route path='/registrations/:id' component={Registration} />
      </div>
    </Router>
  )
}

export default App
