import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import {actionCreators} from './store';
import BaseComponent from "../../BaseComponent";
import './style.less';

const {TreeNode} = Tree;

export interface HomeNavProps {
  navTree?: any;
  getNavTree?: () => any;
  selectNode?: (obj: any) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class HomeNav extends BaseComponent<HomeNavProps, {}> {
  componentWillMount() {
    const {getNavTree} = this.props;
    if (getNavTree) {
      getNavTree();
    }
  }

  renderTree(navTree: any) {
    if (navTree.length >= 1) {
      return navTree.map((item: any, index: number) => {
        return (
          <TreeNode
            title={item.name}
            key={item.id}>
            {this.renderTree(item.children)}
          </TreeNode>
        )
      })
    }
  }

  doRender(): React.ReactElement<{}> {
    const {navTree, selectNode} = this.props;
    return (
      <div className="HomeNav">
        <Tree
          showLine={true}
          onSelect={(checkedKeys: any, e: any) => {
            const {node} = e;
            const {props} = node;
            let obj = {
              name: props.title,
              id: checkedKeys[0]
            }
            if (selectNode) {
              selectNode(obj)
            }
          }}>
          {this.renderTree(navTree)}
        </Tree>
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeNavProps {
  return {
    navTree: state.getIn(['homeNav', 'navTree']),
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeNavProps {
  return {
    getNavTree() {
      dispatch(actionCreators.getNav())
    },
    selectNode(obj) {
      dispatch(actionCreators.selectNode(obj))
    },
  }
}

export default HomeNav;