import logo from './logo.svg';
import './App.css';
import Layout from './layout/Layout';
import axios from 'axios';
import APIContextProvider from './context/APIContext';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import CollectionCard from './components/CollectionCard';
import Home from './pages/Home';

function App() {

  return (
    <APIContextProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Outlet></Outlet>} >
              <Route index element={<Home></Home>}></Route>
            </Route>
          </Routes>
        </Layout>
      </Router>
    </APIContextProvider>
  );
}

export default App;
