import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Series from './pages/Series';
import List from './pages/List';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/series/:id" exact element={<Series />} />
        <Route path="/list" exact element={<List />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;


// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: 'whiteSmoke',
//     color: '',
//     height: 'autovh'
//   },
//   logo: {
//     width: '50px',
//     height: '50px',
//   },
//   left: {
//     minWidth: '10%',
//   },
//   nav: {
//     display: 'flex',
//   },
//   main: {
//     display: 'flex',
//     flex: 2,
//     flexDirection: 'column',
//     minWidth: '30%',
//     padding: '2rem',
//   },
//   right: {
//     minWidth: '10%',
//   },
//   myPost: {
//     display: 'flex',
//     flexDirection: 'row',
//   }

// }
