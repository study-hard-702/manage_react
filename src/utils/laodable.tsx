import React from 'react';
import Loadable from 'react-loadable';

// 通用的过场组件
const loadingComponent = (props: any) => {
  if (props.error) {
    // loader 加载失败
    return <div>Error!</div>;
  } else if (props.timedOut) {
    // loader 加载超时
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    // 避免 Loading 组件闪烁
    // 可以设置一个 delay，代表延时加载渲染 loading 组件
    return <div>Loading...</div>;
  } else {
    return null;
  }
}

// 过场组件默认采用通用的，若传入了 loading，则采用传入的过场组件
export default (loader: any, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading,
    delay: 300,   // 0.3 seconds
  });
}
