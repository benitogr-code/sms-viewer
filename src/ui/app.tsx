import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { Menu } from 'antd';
import { Counter } from './components/counter';
import store from './store';
import './styles/index.css'
import Layout from 'antd/lib/layout/layout';

interface AppProps {
  message: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <HashRouter>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/counter">Counter</Link>
          </Menu.Item>
        </Menu>
        <br/>
        <Switch>
          <Route exact path="/">
            <h2>💖 Welcome!</h2>
            <p>Welcome to your Electron application.</p>
          </Route>
          <Route path="/counter" component={Counter} />
        </Switch>
      </HashRouter>
    )
  }
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App message="Hello from React!" />
    </Provider>,
    document.getElementById('app')
  );
}

render();
