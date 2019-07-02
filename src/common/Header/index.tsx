import * as React from "react";
import {connect} from 'react-redux';
import {actionCreators} from './store';
import BaseComponent from "../BaseComponent";
import {gotoPath} from '../../utils/history';
import './style.less';

export interface HeaderProps {
  loginStatus?: boolean;
  userName?: string;
  logout?: () => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class Header extends BaseComponent<HeaderProps, {}> {
  doRender(): React.ReactElement<{}> {
    const {loginStatus, userName, logout} = this.props;
    return (
      <div className="Header">
        <div className="Header-logo">
          <img src={require('../../statics/logo.png')} alt=''/>
          <span className="Header-logo-text">管理后台</span>
        </div>
        <ul className="Header-menu">
          <li className="Header-menu-userName iconfont">{userName}</li>
          <li className="Header-menu-logout iconfont"
              onClick={() => logout ? logout() : null}>
            {loginStatus ? '退出' : '登陆'}
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: any): HeaderProps {
  return {
    loginStatus: state.getIn(['header', 'loginStatus']),
    userName: 'root',
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HeaderProps {
  return {
    logout() {
      dispatch(actionCreators.changeLoginStatus(false));
      window.sessionStorage.setItem('loginStatus', '2')
      gotoPath('/login')
      // ownProps.history.push('')
    }
  }
}

export default Header;