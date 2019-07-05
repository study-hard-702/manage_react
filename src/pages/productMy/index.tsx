import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import {actionCreators} from "../../common/components/QueryResult/store"
import './style.less';


const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductMyProps {
  getProList?: (data?: any) => any;
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductMy extends BaseComponent<ProductMyProps, {}> {
  componentWillMount() {
    const {getProList} = this.props;
    if (getProList) {
      getProList({
        keyTyle: 'ProductMy'
      });
    }
  }

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductMy">
        我是我的产品
        <QueryResult keyTyle="ProductMy"/>
      </div>
    );
  }
}

function mapStateToProps(state: any): ProductMyProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): ProductMyProps {
  return {
    getProList(data) {
      dispatch(actionCreators.getProList(data));
    }
  }
}

export default ProductMy;