import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import { Input, Icon, Button, Form, notification } from 'antd';
import {actionCreators} from "./store"
import './style.less';

export interface LoginProps {
  pageName?: string;
  form?: any;
  login?: (username: any, password: any) => void;
}

interface inputProps {
  username: string;
  password: string;
}

@connect(mapStateToProps, mapDispatchToProps)
class Login extends BaseComponent<LoginProps, {}> {
  handleSubmit = (e: Event):void => {
    e.preventDefault();
    const { login } = this.props;
    this.props.form.validateFields((err: any, values: inputProps) => {
      if (!err) {
        if (values.username && values.username.trim() === 'admin' && values.password && values.password.trim() === '123456') {
          login && login(values.username, values.password);
        } else {
          notification.error({
            message: '用户名或者密码错误！',
            description: null,
            duration: 2
          })
        }
        // console.log('Received values of form: ', values);
      }
    });
  }

  doRender(): React.ReactElement<{}> {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="Login">
        <div className="Login-main">
          <div className="Login-logo">
            <img src={require('../../statics/logo.png')} alt=""/> 管理后台
          </div>
          <Form onSubmit={this.handleSubmit} className="Login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input
                  placeholder="用户名 ( admin )"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码 ( 123456 )"
                />,
              )}
            </Form.Item>
            <div className="Login-btn">
              <Button type="primary" htmlType="submit">登陆</Button>
            </div>
          </Form>
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
    login(username, password) {
      dispatch(actionCreators.login(username, password));
    }
  }
}

export default Form.create()(Login);