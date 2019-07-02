import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../common/BaseComponent";
import './style.less';

export interface WorkBenchProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class WorkBench extends BaseComponent<WorkBenchProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="WorkBench">

      </div>
    );
  }
}

function mapStateToProps(state: any): WorkBenchProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): WorkBenchProps {
  return {}
}

export default WorkBench;