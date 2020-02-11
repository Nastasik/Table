import React from 'react';
import './App.css';
import Header from './components/Header';
import ChooseDataPage from './components/ChooseDataPage/ChooseDataPage';
import Footer from './components/Footer';
import Main from './components/Main/Main';

const App = () => {
    console.count('App');

    return (
      <div className="App">
          <Header>
            <ChooseDataPage/>
          </Header>
          <Main/>
          <Footer/> 
      </div>
    );
}

export default App;
