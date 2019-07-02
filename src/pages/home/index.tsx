import React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import './style.less';

const Header = loadable(() => import('../../common/Header/index'))
const HomeNav = loadable(() => import('../../common/components/HomeNav/index'))
const HomeMain = loadable(() => import('../../common/components/HomeMain/index'))

export interface HomeProps {
  pageName?: string;
}

@connect(mapStateToProps, mapDispatchToProps)
class Home extends BaseComponent<HomeProps, {}> {
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
  return {}
}

export default Home;