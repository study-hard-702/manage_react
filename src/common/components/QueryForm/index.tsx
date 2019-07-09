import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../BaseComponent";
import { Form, Input, Button, Select} from 'antd';
import './style.less';

const { Option } = Select;
export interface QueryFormProps {
  title?: string,
}

@connect(mapStateToProps, mapDispatchToProps)
class QueryForm extends BaseComponent<QueryFormProps, {}> {
  doRender(): React.ReactElement<{}> {
    return (
      <div className="QueryForm">
        <h4 className="QueryForm-title">{this.props.title}</h4>
        <ul>
          <li>
            <label>产品名称：</label>
            <Input className="entry-box" placeholder="请输入内容" />
          </li>
          <li>
            <label>产品类型：</label>
            <Select className="entry-box" defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </li>
          <li>
            <label>产品代码：</label>
            <Input className="entry-box" placeholder="请输入内容" />
          </li>
          <li>
            <label>发布状态：</label>
            <Select className="entry-box" defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </li>
          <li>
            <label>需求号：</label>
            <Input className="entry-box" placeholder="请输入内容" />
          </li>
          <li className="li-last">
            <Button type="primary" style={{width: '90px', background: '#51a5d5'}}>查询</Button>
            <Button style={{marginLeft: '50px', width: '90px'}}>重置</Button>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: any): QueryFormProps {
  return {
    title: '我的产品',
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): QueryFormProps {
  return {}
}
export default QueryForm;