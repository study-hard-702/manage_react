import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../../../common/BaseComponent";
import {gotoPath} from '../../../../utils/history';
import {actionCreators} from '../../store';
import './style.less';

export interface HomeHeaderProps {
  loginStatus?: boolean;
  userName?: string;
  logIn?: () => any;
  logout?: () => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class HomeHeader extends BaseComponent<HomeHeaderProps, {}> {
  componentWillMount() {
    const loginStatus = window.sessionStorage.getItem('loginStatus');
    if (loginStatus && loginStatus === '1') {
      if (this.props.logIn) {
        this.props.logIn()
      }
    }
  }

  _logout() {
    const {logout} = this.props;
    if (logout) {
      logout()
    }
    window.sessionStorage.setItem('loginStatus', '2')
    gotoPath('/login')
  }

  doRender(): React.ReactElement<{}> {
    const {loginStatus, userName} = this.props;
    return (
      <div className="HomeHeader">
        <div className="HomeHeader-logo">
          <img src={require('../../../../statics/logo.png')} alt=''/>
          <span className="HomeHeader-logo-text">管理后台</span>
        </div>
        <ul className="HomeHeader-menu">
          <li className="HomeHeader-menu-userName iconfont">{userName}</li>
          <li className="HomeHeader-menu-logout iconfont"
              onClick={() => this._logout()}>
            {loginStatus ? '退出' : '登陆'}
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeHeaderProps {
  return {
    loginStatus: state.getIn(['home', 'loginStatus']),
    userName: 'root',
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeHeaderProps {
  return {
    logIn() {
      dispatch(actionCreators.changeLoginStatus(true));
    },
    logout() {
      dispatch(actionCreators.changeLoginStatus(false));
      // ownProps.history.push('')
    }
  }
}

export default HomeHeader;