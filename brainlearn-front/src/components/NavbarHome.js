import Rsf from "../images/Logo RsF (1).svg"
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <section id="nav-bar">
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light">
          <div className="container-fluid">
            <div className="navbar-brand" href="#"><img src={Rsf} alt="" />BrainLearn</div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars" style={{ color: '#fff' }}></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#banner">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#activeRecall">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#footer">Contact</a>
                </li>
                <div className="vl"></div>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </section>
    </>
  );
}

export default NavBar;