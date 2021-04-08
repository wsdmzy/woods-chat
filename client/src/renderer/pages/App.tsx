import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Login from './Login';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {
  
}

const store = {};

const App: React.FC<IProps> = (props) => {
  return (
    // <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </HashRouter>
    // </Provider>
  );
};

export default App;
