import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../BaseComponent";
import './style.less';
import {actionCreators as myAction} from "./store"
import {actionCreators} from "../HomeNav/store"
import {fullScreen, fullExit} from "../../../utils/browser"

export interface HomeMainProps {
  navList?: any;
  currentNav?: any;
  fullScreenFlag?: boolean;
  selectNode?: (obj: any) => any;
  deleteNode?: (e: any, id: number) => any;
  handleNode?: (e: any, handleType: string) => any;
  switchFullscreen?: (flag: boolean) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class HomeMain extends BaseComponent<HomeMainProps, {}> {
  state = {
    showMenu: false
  }

  componentWillMount() {
    const {selectNode} = this.props;
    if (selectNode) {
      selectNode({
        name: "工作台",
        id: 1,
      })
    }
  }

  doRender(): React.ReactElement<{}> {
    const {
      currentNav,
      navList,
      fullScreenFlag,
      selectNode,
      deleteNode,
      handleNode,
      switchFullscreen,
    } = this.props;
    return (
      <div className="HomeMain">
        <div className="HomeMain-nav">
          <div className="HomeMain-left">
            <span className="HomeMain-left-toLeft iconfont"></span>
          </div>
          <ul className="HomeMain-navList">
            {
              navList.map((item: any) => {
                return (
                  <li key={item.id}
                      className={item.id === currentNav.id ? 'HomeMain-currentNav' : ''}
                      onClick={() => selectNode ? selectNode(item) : null}>
                    {item.name}
                    <i className="HomeMain-navList-close iconfont"
                       onClick={(e) => deleteNode ? deleteNode(e, item.id) : null}></i>
                  </li>
                )
              })
            }
          </ul>
          <div className="HomeMain-right">
            <span className="HomeMain-right-qp iconfont"
                  onClick={() => {
                    if (switchFullscreen) {
                      switchFullscreen(!fullScreenFlag)
                    }
                  }}>
            </span>
            <span className="HomeMain-right-menu"
                  onClick={() => {
                    this.setState({
                      showMenu: !this.state.showMenu
                    })
                  }}>
              页面操作 <i className="iconfont"></i>
              {
                this.state.showMenu ?
                  <ul>
                    <li onClick={(e) => handleNode ? handleNode(e, '1') : null}>刷新当前</li>
                    <li onClick={(e) => handleNode ? handleNode(e, '2') : null}>关闭当前</li>
                    <li onClick={(e) => handleNode ? handleNode(e, '3') : null}>全部关闭</li>
                    <li onClick={(e) => handleNode ? handleNode(e, '4') : null}>除此之外全部关闭</li>
                  </ul> : null
              }
            </span>
            <span className="HomeMain-right-toRignt iconfont"></span>
          </div>
        </div>
        {currentNav.name}
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeMainProps {
  return {
    navList: state.getIn(['homeNav', 'navList']),
    currentNav: state.getIn(['homeNav', 'currentNav']),
    fullScreenFlag: state.getIn(['homeMain', 'fullScreenFlag'])
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeMainProps {
  return {
    selectNode(obj) {
      dispatch(actionCreators.selectNode(obj))
    },
    deleteNode(e, id) {
      // 阻止合成事件的冒泡
      e.stopPropagation();
      // 阻止与原生事件的冒泡
      e.nativeEvent.stopImmediatePropagation();
      dispatch(actionCreators.deleteNode(id))
    },
    handleNode(e, handleType) {
      // 阻止合成事件的冒泡
      e.stopPropagation();
      // 阻止与原生事件的冒泡
      e.nativeEvent.stopImmediatePropagation();
      dispatch(actionCreators.handleNode(handleType))
    },
    switchFullscreen(flag) {
      flag ? fullScreen() : fullExit();
      dispatch(myAction.switchFullscreen(flag))
    },
  }
}

export default HomeMain;