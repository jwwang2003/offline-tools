import { hydrate, render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './index.scss';

const Content = (
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(Content, rootElement);
} else {
  render(Content, rootElement);
}

if (module.hot) {
  module.hot.accept('./App.js', () => {
    render(
      <Content />,
      document.getElementById('root'),
    );
  });
}
