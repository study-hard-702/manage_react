import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../common/BaseComponent";
import './style.less';

export interface ProductAddProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class ProductAdd extends BaseComponent<ProductAddProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductAdd">
        88888
      </div>
    );
  }
}

function mapStateToProps(state: any): ProductAddProps {
  return {};
}

function mapDispatchToProps(dispatch: any, ownProps: any): ProductAddProps {
  return {}
}

export default ProductAdd;