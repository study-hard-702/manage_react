import * as React from "react";
import {connect} from 'react-redux';
import {Tree} from 'antd';
import BaseComponent from "../../common/BaseComponent";
import './style.less';

export interface ProductAllProps {

}

@connect(mapStateToProps, mapDispatchToProps)
class ProductAll extends BaseComponent<ProductAllProps, {}> {

  doRender(): React.ReactElement<{}> {
    return (
      <div className="ProductAll">

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