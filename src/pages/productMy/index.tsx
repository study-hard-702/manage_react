import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../common/BaseComponent";
import './style.less';

export interface ProductMyProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class ProductMy extends BaseComponent<ProductMyProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductMy">

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