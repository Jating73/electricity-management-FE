// Imported Internal and External CSS
import './App.css';
import 'antd/dist/antd.css';

// Imported Modules
import { Routes, Route } from 'react-router-dom';

// Imported Components
import Navbar from './components/Navbar';

// Imported Pages
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
