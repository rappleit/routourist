import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Map from './pages/Map';
import Country from './pages/Country';
import CountryInfo from './pages/CountryInfo';
import RouteLibrary from './pages/RouteLibrary';
import TabSidebar from './components/TabSidebar';
import { AuthContextProvider } from './context/AuthContext';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import SavedRoutes from './pages/SavedRoutes';
import PublishedRouteDetail from './pages/PublishedRouteDetail';


function App() {
  window.onbeforeunload = () => {
    localStorage.removeItem('routeName');
    localStorage.removeItem('routeRequest');
  }

  //default country and language

  if (localStorage.getItem("Country") === null || localStorage.getItem("Country") === "") {
    localStorage.setItem("Country", "Singapore")
  }

  if (localStorage.getItem("Language") === null || localStorage.getItem("Country") === "") {
    localStorage.setItem("Language", "English")
  }


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
          path="/country"
          element={<Country/>}/>
          <Route
          path="/countryinfo"
          element={<CountryInfo/>}/>
        <Route
        path="/routelibrary"
        element={<RouteLibrary/>}
        exact/>
        <Route 
        path="/routeLibrary/:routeID"
        element={<PublishedRouteDetail/>}
        exact
        />
        <Route 
        path="/savedroutes"
        element={<SavedRoutes/>}
        exact
        />
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
