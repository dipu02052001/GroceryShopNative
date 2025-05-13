import React from 'react';
import AppNagivator from './components/AppNagivator';
import {LoginProvider} from './components/LoginContext';
import {Provider as PaperProvider} from 'react-native-paper'; // ✅ Import this

function App() {
  return (
    <PaperProvider>
      <LoginProvider>
        <AppNagivator />
      </LoginProvider>
    </PaperProvider>
  );
}

export default App;
