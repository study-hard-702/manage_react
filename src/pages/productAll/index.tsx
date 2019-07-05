import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import {actionCreators} from "../../common/components/QueryResult/store"
import './style.less';

const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductAllProps {
  getProList?: (data?: any) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductAll extends BaseComponent<ProductAllProps, {}> {
  componentWillMount() {
    const {getProList} = this.props;
    if (getProList) {
      getProList({
        keyTyle: 'ProductAll'
      });
    }
  }

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductAll">
        我是所有产品
        <QueryResult keyTyle="ProductAll"/>
      </div>
    );
  }
}

function mapStateToProps(state: any): ProductAllProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): ProductAllProps {
  return {
    getProList(data) {
      dispatch(actionCreators.getProList(data));
    }
  }
}

export default ProductAll;