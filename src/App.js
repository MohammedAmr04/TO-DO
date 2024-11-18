import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import DisplayList from './Components/ShowLists/DisplayList';
import ListProvider from './Context/ListContext';

function App() {
  return (
    <>
      <ListProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/list' element={<DisplayList />} />
        </Routes>
      </ListProvider>
    </>
  );
}

export default App;
