import * as React from "react";
import {connect} from 'react-redux';
import loadable from "../../utils/laodable"
import BaseComponent from "../../common/BaseComponent";
import './style.less';


const QueryResult = loadable(() => import('../../common/components/QueryResult/index'));
const QueryForm = loadable(() => import('../../common/components/QueryForm/index'));

export interface ProductMyProps {
}

@connect(mapStateToProps, mapDispatchToProps)
class ProductMy extends BaseComponent<ProductMyProps, {}> {
  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductMy">
        <QueryForm title="我的产品"/>
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

  }
}

export default ProductMy;