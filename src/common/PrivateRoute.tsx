import * as React from "react";
import {connect} from 'react-redux';
import {withRouter, Route} from 'react-router-dom';
import BaseComponent from "./BaseComponent";
import {gotoPath} from '../utils/history';

export interface PrivateRouteProps {
  path?: string;
  exact?: boolean;
  strict?: any;
  Component?: any;
}

@connect(mapStateToProps, mapDispatchToProps)
class PrivateRoute extends BaseComponent<PrivateRouteProps, {}> {
  componentDidMount() {
    const loginStatus = window.sessionStorage.getItem('loginStatus');
    if (!loginStatus || loginStatus === '2') {
      gotoPath('/login')
    }
  }

  doRender(): React.ReactElement<{}> {
    const {path, exact, strict, Component} = this.props;
    return (
      <Route path={path} exact={exact} strict={strict}>
        <Component {...this.props} />
      </Route>
    );
  }
}

function mapStateToProps(state: any, ownProps: any): PrivateRouteProps {
  return {
    path: ownProps.path,
    exact: ownProps.exact,
    strict: ownProps.strict,
    Component: ownProps.component,
  };
}

function mapDispatchToProps(dispatch: any): PrivateRouteProps {
  return {}
}

export default withRouter(PrivateRoute);
