import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import './style.less';

export interface WorkBenchProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class WorkBench extends BaseComponent<WorkBenchProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="WorkBench">
        我是工作台
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