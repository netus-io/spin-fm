import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './reducers'

import Header             from './components/Header'
import ScreenLogin        from './screens/ScreenLogin'
import ScreenLoungeArea   from './screens/ScreenLoungeArea'
import { ScreenCreateUser } from './screens/ScreenCreateUser';
import { ScreenMusicRoom } from './screens/ScreenMusicRoom';

// Dummy function that sets whether the user is logged in or not
function isLoggedIn(){
  return false
}

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div className="app">
        <Header/>
        <Switch>
          <Route exact path="/" render={() => (
            isLoggedIn() ? (
              <Redirect to="/screenLoungeArea" />
            ) : (
              <ScreenLogin/>
            )
          )} />
          <Route exact path="/screenLogin"          component={ ScreenLogin }/>
          <Route exact path='/screenCreateUser'     component={ ScreenCreateUser }/>
          <Route exact path='/screenLoungeArea'     component={ ScreenLoungeArea }/>
          <Route       path="/screenMusicRoom"      component={ ScreenMusicRoom }/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'))