import React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import {actionCreators} from "./store"
import './style.less';

const Header = loadable(() => import('./children/HomeHeader/index'))
const HomeNav = loadable(() => import('./children/HomeNav/index'))
const HomeMain = loadable(() => import('./children/HomeMain/index'))

export interface HomeProps {
  pageName?: string;
  getProList?: () => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends BaseComponent<HomeProps, {}> {
  componentWillMount() {
    const {getProList} = this.props;
    if (getProList) {
      getProList();
    }
  }

  doRender(): React.ReactElement<{}> {
    return (
      <div className="Home">
        <Header/>
        <HomeNav/>
        <HomeMain/>
      </div>
    );
  }
}

function mapStateToProps(state: any): HomeProps {
  return {
    pageName: '首页',
  };
}

function mapDispatchToProps(dispatch: any, ownProps: any): HomeProps {
  return {
    getProList() {
      dispatch(actionCreators.getProList());
    }
  }
}

export default Home;