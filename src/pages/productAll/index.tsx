import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import './style.less';

const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductAllProps {
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductAll extends BaseComponent<ProductAllProps, {}> {
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
  return {}
}

export default ProductAll;