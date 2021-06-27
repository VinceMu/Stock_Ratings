import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useCompanySource } from './services/useCompanySource';
import { StockApiService } from './services/httpService';

function App() {

  const companySource = useCompanySource(StockApiService, StockApiService);
  console.log(companySource)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
