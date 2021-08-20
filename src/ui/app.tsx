import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { Counter } from './components/counter';
import store from './store';

interface AppProps {
  message: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <HashRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
          </ul>
        </nav>
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
