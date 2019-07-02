import {createBrowserHistory as createHistory} from 'history'

const history = createHistory();

const goBack = () => {
  history.goBack();
};

const goForward = () => {
  history.goForward();
};

const gotoRoute = (route: string) => {
  console.log('route', route)
  history.push(route);
};

const gotoPath = (path: string, state?: any) => {
  history.push({
    pathname: path,
    search: state,
  });
};

const gotoHref = (href: string) => {
  window.open(href);
};

export {
  goBack,
  goForward,
  gotoRoute,
  gotoPath,
  gotoHref,
  history,
};

export default history;
