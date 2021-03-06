import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import NewChat from './admin-misc/components/NewChat'
import ChangePassword from './auth/components/ChangePassword'
import AutoDismissAlert from './auth/components/AutoDismissAlert'
// import Users from './users/components/Users'
import Home from './home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      room: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setRoom = room => this.setState({ room })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user, room } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            alert={alert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home alert={this.alert} match={this.match} user={user} setRoom={this.setRoom}/>
          )} />
          <AuthenticatedRoute user={user} path='/admin' render={() => (
            <NewChat alert={this.alert} match={this.match} user={user}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} room={room} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} room={room} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} room={room}/>
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} room={room} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
