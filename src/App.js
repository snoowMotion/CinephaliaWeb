import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/style.css';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Subscribe from "./pages/Subscribe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return(
      <Router>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/subscribe" element={<Subscribe />} />
              {/* Add other routes here */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
