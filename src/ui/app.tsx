import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
    message: string;
}

class App extends React.Component<AppProps> {
    render() {
        return <h2>{this.props.message}</h2>
    }
}

function render() {
  ReactDOM.render(<App message="Hello from React!" />, document.getElementById('app'));
}

render();
