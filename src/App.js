import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/style.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
function App() {
  return(
      <div className="wrapper">
        <Header/>
        <div className="content">
            <h1>Bienvenue sur Cinephalia</h1>
            <p>Le site de réservation de vos films préférés</p>
        </div>
        <Footer/>
      </div>
  );
}

export default App;
