import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../BaseComponent";
import './style.less';
import {actionCreators} from "../HomeNav/store"

export interface HomeMainProps {
  navList?: any;
  currentNav?: any;
  setCurrentNode?: (obj: any) => any;
  delCurrentNode?: (e: any, id: number) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class HomeMain extends BaseComponent<HomeMainProps, {}> {
  componentWillMount() {
    const {setCurrentNode} = this.props;
    if (setCurrentNode) {
      setCurrentNode({
        id: 0,
        name: "工作台",
      })
    }
  }

  doRender(): React.ReactElement<{}> {
    const {currentNav, navList, setCurrentNode, delCurrentNode} = this.props;
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
                      onClick={() => setCurrentNode ? setCurrentNode(item) : null}>
                    {item.name}
                    <i className="HomeMain-navList-close iconfont"
                       onClick={(e) => delCurrentNode ? delCurrentNode(e, item.id) : null}></i>
                  </li>
                )
              })
            }
          </ul>
          <div className="HomeMain-right">
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
    currentNav: state.getIn(['homeNav', 'currentNav'])
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeMainProps {
  return {
    setCurrentNode(obj) {
      dispatch(actionCreators.selectNode(obj))
    },
    delCurrentNode(e, id) {
      // 阻止合成事件的冒泡
      e.stopPropagation();
      // 阻止与原生事件的冒泡
      e.nativeEvent.stopImmediatePropagation();
      dispatch(actionCreators.deleteNode(id))
    }
  }
}

export default HomeMain;