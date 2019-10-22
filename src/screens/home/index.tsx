import React from 'react';
import { Routes } from '@/interfaces/router/Router';
import Logo from '@/screens/home/react-logo.svg';
import './index.scss';

export default (routes: Routes) => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};
