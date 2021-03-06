import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import './style.less';

const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductCheckProps {
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductCheck extends BaseComponent<ProductCheckProps, {}> {
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
  return {}
}

export default ProductCheck;