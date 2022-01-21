import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div>
      <div className="page">
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
