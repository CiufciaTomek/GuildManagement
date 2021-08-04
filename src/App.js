import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginForm from './redux/user/containers/LoginForm';
import Admin from './components/dashboard/Admin';
import PlayerList from './components/dashboard/PlayerList';
import Blacklist from './components/dashboard/Blacklist';
import Header from './components/dashboard/Header';
import Zvz from './redux/zvz/containers/Zvz';

import { checkToken } from './redux/user/duck/operations'
import Declarations from './components/dashboard/Declarations';
import Regear from './components/dashboard/Regear';
import RdaySets from './components/dashboard/RdaySets';
import RdaySetsContainer from './redux/rday/containers/RdaySetsContainer';
import e403 from './components/dashboard/e403';
import Armory from './components/dashboard/Armory';

const App = ({ user, checkToken }) => {
  useEffect(() => { checkToken() }, [])

  return (
    <div className="App">
      <Router>
        {user.zalogowany ? (
          <Header />
        ) : ''}

        <div className='container-app'>
          {user.zalogowany
            ? (
              <Switch>
                <Route exact path="/" component={PlayerList}></Route>
                <Route path="/blacklist" component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_BLACKLIST') ? Blacklist : e403}></Route>
                <Route path='/zvz' component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_ZVZ') ? Zvz : e403}></Route>
                <Route path='/rday' component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_RDAY_DECLARATIONS') ? Declarations : e403}></Route>
                <Route path='/rday-sets' component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_RDAY_SETS') ? RdaySets : e403}>
                  {user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_RDAY_SETS') ? (
                    <RdaySetsContainer />
                  ) : ''}
                </Route>
                <Route path='/regear' component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_REGEAR') ? Regear : e403}></Route>
                <Route path='/armory' component={Armory}></Route>
                {user.data ? (
                  <Route path='/admin' component={user.data.Ranks.Permissions.PermAtr.some(e => e.name === 'CAN_SEE_ADMIN_PANEL') ? Admin : e403}></Route>
                ) : ''}

              </Switch>
            )
            : (
              <Switch>
                <Route path="*">
                  <LoginForm />
                </Route>
              </Switch>
            )}
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(checkToken())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
