import React, {Component, lazy, Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import PageLoading from './common/PageLoading';

const Home = lazy(() => import('./pages/home/index'))
const Login = lazy(() => import('./pages/login/index'))

class App extends Component {
  render() {
    return (
      <Suspense fallback={<PageLoading/>}>
        <Switch>
          <Route path="/" exact component={Login}/>
          <PrivateRoute path='/login' exact component={Login}/>
          <PrivateRoute path='/home' component={Home}/>
        </Switch>
      </Suspense>
    );
  }
}

export default App;