import * as React from "react";
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import BaseComponent from "../../../../common/BaseComponent";
import loadable from "../../../../utils/laodable"
import {gotoPath} from "../../../../utils/history";
import {fullScreen, fullExit} from "../../../../utils/browser"
import {actionCreators} from "../../store"
import './style.less';

const productMy = loadable(() => import('../../../productMy'))
const productAdd = loadable(() => import('../../../productAdd'))
const productAll = loadable(() => import('../../../productAll'))
const productCheck = loadable(() => import('../../../productCheck'))
const workBench = loadable(() => import('../../../workBench'))

export interface HomeMainProps {
  navList?: any;
  currentNav?: any;
  fullScreenFlag?: boolean;
  menuList?: any;
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
        path: "workBench",
        id: 1,
      })
    }
  }

  doRender(): React.ReactElement<{}> {
    const {
      currentNav,
      navList,
      fullScreenFlag,
      menuList,
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
                  <ul>{
                    menuList.map((item: any, index: number) => {
                      return (
                        <li key={1}
                            onClick={(e) => {
                              this.setState({
                                showMenu: false
                              })
                              if (handleNode) {
                                handleNode(e, item.id)
                              }
                            }}>
                          {item.name}
                        </li>
                      )
                    })
                  }
                  </ul> : null
              }
            </span>
            <span className="HomeMain-right-toRignt iconfont"></span>
          </div>
        </div>
        <Redirect to="/home/workBench"/>
        <Route path='/home/productMy' exact component={productMy}/>
        <Route path='/home/productAdd' exact component={productAdd}/>
        <Route path='/home/productAll' exact component={productAll}/>
        <Route path='/home/productCheck' exact component={productCheck}/>
        <Route path='/home/workBench' exact component={workBench}/>
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeMainProps {
  return {
    navList: state.getIn(['home', 'navList']),
    currentNav: state.getIn(['home', 'currentNav']),
    fullScreenFlag: state.getIn(['home', 'fullScreenFlag']),
    menuList: [
      {id: 1, name: '刷新当前'},
      {id: 2, name: '关闭当前'},
      {id: 3, name: '全部关闭'},
      {id: 4, name: '除此之外全部关闭'}
    ]
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeMainProps {
  return {
    selectNode(obj) {
      dispatch(actionCreators.selectNode(obj))
      gotoPath(`/home/${obj.path}`);
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
      dispatch(actionCreators.switchFullscreen(flag))
    },
  }
}

export default HomeMain;