import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Map from './pages/Map';
import LibraryRoute from './pages/LibraryRoute';
import TabSidebar from './components/TabSidebar';
import { AuthContextProvider } from './context/AuthContext';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <ReactNotifications />
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
        path="/libraryroute"
        element={<LibraryRoute/>}/>
        <Route
          path="/login"
          element={<Login/>}/>
        <Route
          path="/signup"
          element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
