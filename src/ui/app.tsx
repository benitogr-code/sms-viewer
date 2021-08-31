import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { ChatPage } from './pages/chat';
import { StartPage } from './pages/start';
import store, { useAppSelector } from './store';
import './styles/index.css'
import 'react-chat-elements/dist/main.css';

const App = () => {
  const conversations = useAppSelector((state) => state.conversations.data);
  const displayChat = conversations && conversations.length > 0;

  return (
    <Layout>
      { displayChat ? <ChatPage conversations={conversations}/> : <StartPage /> }
    </Layout>
  );
};

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
}

render();
