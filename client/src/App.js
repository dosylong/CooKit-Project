import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme';
import SignUpPage from './features/Auth/pages/SignUpPage';
import './App.css';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <div>
        <SignUpPage />
      </div>
    </ChakraProvider>
  );
}

export default App;
