import React from 'react';
import './App.css';
import { useCompanySource, isFetchedState } from './services/useCompanySource';
import { StockApiService } from './services/httpService';
import { StockTable } from './components/stock-table';
import { Header, Icon, Divider } from 'semantic-ui-react'

function App() {

  const companySource = useCompanySource(StockApiService, StockApiService);
  return (
    <div className="App">
      <Header as='h1' style={{ padding: '1rem', paddingBottom: 0, color: 'whitesmoke' }}>Company Ratings <Icon name='chart line' /></Header>
      <Divider />
      {isFetchedState(companySource) ?
        <>
          <div>
            <StockTable companies={companySource.companies} />
          </div>
        </>
        : <></>}
    </div>
  );
}

export default App;
