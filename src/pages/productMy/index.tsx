import * as React from "react";
import {connect} from 'react-redux';
import BaseComponent from "../../common/BaseComponent";
import './style.less';
import loadable from "../../utils/laodable"

const QueryResult = loadable(() => import('../../common/components/QueryResult/index'))

export interface ProductMyProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class ProductMy extends BaseComponent<ProductMyProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductMy">
        我是我的产品
        <QueryResult/>
      </div>
    );
  }
}

function mapStateToProps(state: any): ProductMyProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): ProductMyProps {
  return {}
}

export default ProductMy;