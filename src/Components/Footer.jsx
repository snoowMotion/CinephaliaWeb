import Header from "./Header";

function Footer() {
  return (
      <footer className="footer bg-light text-dark py-4">
          <div className="container">
              <div className="row">
                  <div className="col-md-4">
                      <h5>Adresse</h5>
                      <p>123 Rue Exemple, 75000 Paris, France</p>
                  </div>
                  <div className="col-md-4">
                      <h5>Horaires</h5>
                      <p>Lundi - Vendredi: 9h00 - 18h00</p>
                      <p>Samedi: 10h00 - 14h00</p>
                  </div>
                  <div className="col-md-4">
                      <h5>Contact</h5>
                      <p>Téléphone: +33 1 23 45 67 89</p>
                      <div className="d-flex justify-content-start align-items-center">
                          <i className="bi bi-facebook social-icon"></i>
                          <i className="bi bi-twitter social-icon"></i>
                          <i className="bi bi-instagram social-icon"></i>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  );
}
export default Footer;