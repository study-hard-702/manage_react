import React, { PureComponent, ReactElement } from 'react';

abstract class BasePureComponent<P, S> extends PureComponent<P, S> {
  render(): ReactElement<{}> {
    let result: any;
    try {
      result = this.doRender();
    } catch (error) {
      this.logError(error);
      result = null;
    }
    return result;
  }
  abstract doRender(): ReactElement<{}>;

  logError(error: Error): void {
    const componentName: string = (this as any)._reactInternalInstance._currentElement.type.name;
    const componentDetail: string = (this as any)._reactInternalInstance._currentElement.type.toString();
    let propsString = "";
    for (let propName in this.props) {
      propsString += " " + propName;
    }
    console.error(error, {Component: componentName, ComponentDetail: componentDetail, PropList: propsString});
    console.error("A component (" + componentName + ") had an error during render. " +
      "Please fix this immediately, even if you don't own this component. " +
      "This message is designed to be annoying so that the problem is addressed.");
  }
}

export default BasePureComponent;