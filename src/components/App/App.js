import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  return (
    <div>
      <div className="page">
        <ErrorPage />
        <Login />
        <Register />
        <Header />

        <SavedMovies />
        <Main />
        <AboutMe />
        <Footer />
      </div>
    </div>
  );
}

export default App;
