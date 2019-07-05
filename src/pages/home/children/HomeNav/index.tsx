import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../../../common/BaseComponent";
import {gotoPath} from "../../../../utils/history";
import {actionCreators} from '../../store/index';
import './style.less';

const {TreeNode} = Tree;

export interface HomeNavProps {
  navTree?: any;
  getNavTree?: () => any;
  selectNode?: (props: any, id: string) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class HomeNav extends BaseComponent<HomeNavProps, {}> {
  componentDidMount() {
    const {getNavTree} = this.props;
    if (getNavTree) {
      getNavTree();
    }
  }

  _selectNode(props: any, id: string) {
    const {selectNode} = this.props;
    if (!props.children && id && selectNode) {
      selectNode(props, id)
    }
    if (props.path) {
      gotoPath(`/home/${props.path}`);
    }
  }

  _renderTree(navTree: any) {
    if (navTree.length >= 1) {
      return navTree.map((item: any, index: number) => {
        return (
          <TreeNode
            title={item.name}
            key={item.id}
            path={item.path}
          >
            {this._renderTree(item.children)}
          </TreeNode>
        )
      })
    }
  }

  doRender(): React.ReactElement<{}> {
    const {navTree} = this.props;
    return (
      <div className="HomeNav">
        <Tree
          showLine={true}
          onSelect={(checkedKeys: any, e: any) => {
            const {node} = e;
            const {props} = node;
            this._selectNode(props, checkedKeys[0])
          }}>
          {this._renderTree(navTree)}
        </Tree>
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeNavProps {
  return {
    navTree: state.getIn(['home', 'navTree']),
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeNavProps {
  return {
    getNavTree() {
      dispatch(actionCreators.getNav())
    },
    selectNode(props, id) {
      dispatch(actionCreators.selectNode({
        name: props.title,
        path: props.path,
        id: parseInt(id, 10),
      }))
    }
  }
}

export default HomeNav;