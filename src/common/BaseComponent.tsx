import * as React from "react";

abstract class BaseComponent<P, S> extends React.Component<P, S> {
  render(): React.ReactElement<{}> {
    let result: any;
    try {
      result = this.doRender();
    } catch (error) {
      this.logError(error);
      result = null;
    }

    return result;
  }

  abstract doRender(): React.ReactElement<{}>;

  logError(error: Error): void {
    const componentName: string = (this as any)._reactInternalFiber.type.name;
    const componentDetail: string = (this as any)._reactInternalFiber.type.toString();
    let propsString = "";
    for (let propName in this.props) {
      propsString += " " + propName;
    }
    console.error(error, {Component: componentName, ComponentDetail: componentDetail, PropList: propsString});
    console.error("A component (" + componentName + ") had an error during render. " +
      "Please fix this immediately, even if you don't own this component. " +
      "This message is designed to be annoying so that the problem is addressed.");
  }
};

export default BaseComponent;
