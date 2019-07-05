import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import {actionCreators} from "../../common/components/QueryResult/store"
import './style.less';

const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductCheckProps {
  getProList?: (data?: any) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductCheck extends BaseComponent<ProductCheckProps, {}> {
  componentDidMount() {
    const {getProList} = this.props;
    if (getProList) {
      getProList({
        keyTyle: 'ProductCheck'
      });
    }
  }

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductCheck">
        我是审核管理
        <QueryResult keyTyle="ProductCheck"/>
      </div>
    );
  }
}

function mapStateToProps(state: any): ProductCheckProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): ProductCheckProps {
  return {
    getProList(data) {
      dispatch(actionCreators.getProList(data));
    }
  }
}

export default ProductCheck;