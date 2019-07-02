import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../BaseComponent";
import './style.less';

export interface QueryFormProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class QueryForm extends BaseComponent<QueryFormProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="QueryForm">

      </div>
    );
  }
}

function mapStateToProps(state: any): QueryFormProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): QueryFormProps {
  return {}
}

export default QueryForm;