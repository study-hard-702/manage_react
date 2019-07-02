import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import {Input, Icon, Button} from 'antd';
import {actionCreators} from "./store"
import './style.less';

export interface LoginProps {
  pageName?: string;
  login?: (userame: any, password: any) => void;
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends BaseComponent<LoginProps, {}> {
  userame: any = null;
  password: any = null;

  doRender(): React.ReactElement<{}> {
    const {login} = this.props;
    console.log(this.state)
    return (
      <div className="Login">
        <div className="Login-main">
          <div className="Login-logo">
            <img src={require('../../statics/logo.png')} alt=""/> 管理后台
          </div>
          <div className="Login-form">
            <Input
              placeholder="用户名"
              style={{marginBottom: '20px'}}
              ref={(input: any) => {
                this.userame = input
              }}
              prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
            <Input
              placeholder="密码"
              type='password'
              ref={(input: any) => {
                this.password = input
              }}
              prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
          </div>
          <div className="Login-btn">
            <Button type="primary" onClick={() => login ? login(this.userame, this.password) : null}>登陆</Button>
          </div>
        </div>
        <div className="Login-bottom">
          XXX 有限公司 版权所有
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any): LoginProps {
  return {
    pageName: '登陆页面',
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): LoginProps {
  return {
    login(userameElem, passwordElem) {
      const userame = userameElem.state.value;
      const password = passwordElem.state.value
      dispatch(actionCreators.login(userame, password));
    }
  }
}

export default Login;