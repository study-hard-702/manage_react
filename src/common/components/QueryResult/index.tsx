import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../BaseComponent";
import './style.less';

export interface QueryResultProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class QueryResult extends BaseComponent<QueryResultProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="QueryResult">

      </div>
    );
  }
}

function mapStateToProps(state: any): QueryResultProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): QueryResultProps {
  return {}
}

export default QueryResult;