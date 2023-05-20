import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Map from './pages/Map';
import TabSidebar from './components/TabSidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <TabSidebar />

      <Routes>
        <Route
          path="/"
          element={<Landing/>}/>
        <Route
          path="/map"
          element={<Map/>}/>
        <Route
          path="/login"
          element={<Login/>}/>
        <Route
          path="/signup"
          element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
