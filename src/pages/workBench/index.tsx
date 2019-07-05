import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import {gotoPath} from "../../utils/history";
import './style.less';
import {actionCreators} from "../home/store";

export interface WorkBenchProps {
  navTree?: any;
  selectNode?: (props: any, id: string) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class WorkBench extends BaseComponent<WorkBenchProps, {}> {
  // 跳转对应路由
  goRoute(path: string) {
    const {navTree} = this.props;
    let filterRoute: any = {};
    navTree.map((item: any) => {
      if (item.children && item.children.length > 0) {
        filterRoute = item.children.find((itemSon: any) => itemSon.path === path)
      } else {
        filterRoute = item.path === path ? item : {}
      }
      return filterRoute
    })
    this._selectNode(filterRoute, filterRoute.id)
  }

  // 从navList选中对应的节点
  _selectNode(props: any, id: string) {
    const {selectNode} = this.props;
    if (id && selectNode) {
      selectNode(props, id)
    }
    if (props.path) {
      gotoPath(`/home/${props.path}`);
    }
  }

  doRender(): React.ReactElement<{}> {
    return (
      <div className="WorkBench">
        <div className="WorkBench-toDo">
          <h4 className="WorkBench-toDo-title">待办事项</h4>
          <ul className="WorkBench-toDo-list">
            <li className="toDo-item" onClick={() => this.goRoute('productCheck')}>
              <div className="toDo-item-img">
                <img src={require('../../statics/img/workBench/audit-will.png')} alt=''/>
              </div>
              <div className="toDo-item-text">
                <p className="audit-text">待审核产品</p>
                <p className="audit-num">67</p>
              </div>
            </li>
            <li className="toDo-item" onClick={() => this.goRoute('productMy')}>
              <div className="toDo-item-img">
                <img src={require('../../statics/img/workBench/audit-yes.png')} alt=''/>
              </div>
              <div className="toDo-item-text">
                <p className="audit-text">审核通过产品</p>
                <p className="audit-num">23</p>
              </div>
            </li>
            <li className="toDo-item" onClick={() => this.goRoute('productMy')}>
              <div className="toDo-item-img">
                <img src={require('../../statics/img/workBench/audit-no.png')} alt=''/>
              </div>
              <div className="toDo-item-text">
                <p className="audit-text">审核未通过产品</p>
                <p className="audit-num">43</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="WorkBench-shortcut">
          <h4 className="WorkBench-shortcut-title">快捷功能</h4>
          <ul className="WorkBench-shortcut-list">
            <li className="shortcut-item" title="跳转到创建产品页面,进行新产品创建"
                onClick={() => this.goRoute('productAdd')}>
              <img src={require('../../statics/img/workBench/createProduct.png')} alt=''/>
              <p className="shortcut-text">创建产品</p>
            </li>
            <li className="shortcut-item" title="跳转到我的产品查询页面"
                onClick={() => this.goRoute('productMy')}>
              <img src={require('../../statics/img/workBench/myProduct.png')} alt=''/>
              <p className="shortcut-text">我的产品</p>
            </li>
            <li className="shortcut-item" title="跳转到所有产品查询页面，可对已有产品进行复用"
                onClick={() => this.goRoute('productAll')}>
              <img src={require('../../statics/img/workBench/allProduct.png')} alt=''/>
              <p className="shortcut-text">产品复用</p>
            </li>
            <li className="shortcut-item" title="跳转到审核管理页面，对待审核产品进行审核"
                onClick={() => this.goRoute('productCheck')}>
              <img src={require('../../statics/img/workBench/auditProduct.png')} alt=''/>
              <p className="shortcut-text">审核管理</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any): WorkBenchProps {
  return {
    navTree: state.getIn(['home', 'navTree']),
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): WorkBenchProps {
  return {
    selectNode(props, id) {
      dispatch(actionCreators.selectNode({
        name: props.name,
        path: props.path,
        id: parseInt(id, 10),
      }))
    }
  }
}

export default WorkBench;