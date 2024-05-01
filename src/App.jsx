import React from 'react';
import { CryptoContextProvider } from './context/cryprto-context';
import AppLayout from './components/Layout/AppLayout';

const App = () => {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
};

export default App;