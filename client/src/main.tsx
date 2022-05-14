import React from 'react';
import ReactDOM from 'react-dom/client';
import Pages from './pages';
import GlobalStyles from './styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <Pages />
  </React.StrictMode>
);
