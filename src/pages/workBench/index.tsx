import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import {gotoPath} from "../../utils/history";
import './style.less';
import {actionCreators} from "../home/store";

export interface WorkBenchProps {
  navTree?: any;
  toDoList?: any;
  shortcutList?: any;
  selectNode?: (props: any, id: string) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class WorkBench extends BaseComponent<WorkBenchProps, {}> {
  // 跳转对应路由
  goRoute(path: string) {
    const {navTree} = this.props;
    const targetObj: any = this._filterRouteFun(navTree, path);
    this._selectNode(targetObj, targetObj.id)
  }

  // 树级递归过滤出目标对象
  _filterRouteFun(arr: any, path: string) {
    let targetObj: any = {};
    var getTickMenuId = function (obj: any, path: string) {
      if (undefined === obj || null === obj || !(obj instanceof Object)) {
        return;
      }
      if (obj.path && obj.path === path) {
        targetObj = Object.assign({}, obj)
      }
      if (null != obj.children && obj.children instanceof Array) {
        for (let child of obj.children) {
          getTickMenuId(child, path);
        }
      }
    }
    if (!(arr instanceof Array)) {
      return false;
    }
    for (let rootMenu of arr) {
      getTickMenuId(rootMenu, path);
    }
    return targetObj;
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
    const {
      toDoList,
      shortcutList,
    } = this.props;
    return (
      <div className="WorkBench">
        <div className="WorkBench-toDo">
          <h4 className="WorkBench-toDo-title">待办事项</h4>
          <ul className="WorkBench-toDo-list">
            {
              toDoList.map((item: any, index: number) => {
                return (
                  <li key={index}
                      className="toDo-item"
                      onClick={() => this.goRoute(item.path)}>
                    <div className="toDo-item-img">
                      <img src={item.imgUrl} alt=''/>
                    </div>
                    <div className="toDo-item-text">
                      <p className="audit-text">{item.auditText}</p>
                      <p className="audit-num">{item.auditNum}</p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="WorkBench-shortcut">
          <h4 className="WorkBench-shortcut-title">快捷功能</h4>
          <ul className="WorkBench-shortcut-list">
            {
              shortcutList.map((item: any, index: number) => {
                return (
                  <li key={index}
                      className="shortcut-item"
                      title={item.title}
                      onClick={() => this.goRoute(item.path)}>
                    <img src={item.imgUrl} alt=''/>
                    <p className="shortcut-text">{item.shortcutText}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any): WorkBenchProps {
  return {
    navTree: state.getIn(['home', 'navTree']),
    toDoList: [
      {
        path: 'productCheck',
        imgUrl: require('../../statics/img/workBench/audit-will.png'),
        auditText: '待审核产品',
        auditNum: 67,
      },
      {
        path: 'productMy',
        imgUrl: require('../../statics/img/workBench/audit-yes.png'),
        auditText: '审核通过产品',
        auditNum: 23,
      },
      {
        path: 'productMy',
        imgUrl: require('../../statics/img/workBench/audit-no.png'),
        auditText: '审核未通过产品',
        auditNum: 43,
      },
    ],
    shortcutList: [
      {
        path: 'productAdd',
        imgUrl: require('../../statics/img/workBench/createProduct.png'),
        shortcutText: '创建产品',
        title: '跳转到创建产品页面,进行新产品创建',
      },
      {
        path: 'productMy',
        imgUrl: require('../../statics/img/workBench/myProduct.png'),
        shortcutText: '我的产品',
        title: '跳转到我的产品查询页面',
      },
      {
        path: 'productAll',
        imgUrl: require('../../statics/img/workBench/allProduct.png'),
        shortcutText: '产品复用',
        title: '跳转到所有产品查询页面，可对已有产品进行复用',
      },
      {
        path: 'productCheck',
        imgUrl: require('../../statics/img/workBench/auditProduct.png'),
        shortcutText: '审核管理',
        title: '跳转到审核管理页面，对待审核产品进行审核',
      },
    ]
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