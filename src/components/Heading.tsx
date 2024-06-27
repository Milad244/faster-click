import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

const Heading = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Faster Click</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" href="#">Timed<FontAwesomeIcon icon={faClock} className="nav-icons"/></a>
                    <a className="nav-link" href="#">Clicks<FontAwesomeIcon icon={faArrowPointer} className="nav-icons"/></a>
                    <a className="nav-link" href="#">Competitive<FontAwesomeIcon icon={faCrosshairs} className="nav-icons"/></a>
                    <a className="nav-link" href="#">About</a>
                </div>
                </div>
            </div>
            </nav>
            <a className="nav-link" href="#">Speed</a>
            <a className="nav-link" href="#">Tracking</a>
            <a className="nav-link" href="#">Flicking</a>
        </header>
    );
}

export default Heading