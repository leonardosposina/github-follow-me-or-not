import React from 'react';

import AppProvider from './hooks';
import Landing from './pages/Landing';

import './assets/styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => (
  <AppProvider>
    <Landing />
  </AppProvider>
);

export default App;
