import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/style.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './Components/PrivateRoute';
import FilmList from './pages/Film/FilmList';
import FilmNew from './pages/Film/FilmNew';
import FilmEdit from './pages/Film/FilmEdit';
function App() {
  return(
      <Router>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/" element={
                    <PrivateRoute roles={['ROLE_USER']}>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/admin/films/list" element={
                    <PrivateRoute roles={['ROLE_ADMIN']}>
                        <FilmList />
                    </PrivateRoute>
                } />
                <Route path="/admin/films/new" element={
                    <PrivateRoute roles={['ROLE_ADMIN']}>
                        <FilmNew />
                    </PrivateRoute>
                } />
                <Route path="/admin/films/edit/:id" element={
                    <PrivateRoute roles={['ROLE_ADMIN']}>
                        <FilmEdit />
                    </PrivateRoute>
                } />
              {/* Add other routes here */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
