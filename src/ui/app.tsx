import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { StartPage } from './pages/start';
import store from './store';
import './styles/index.css'

interface AppProps {
  message: string;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <Layout>
        <StartPage />
      </Layout>
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
