import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useState } from 'react';
import { measureMode, siteType } from '../App';

/* MIGHT ADD BACK BUT PROB NOT
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faClock} className="nav-icons"/>
import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faArrowPointer} className="nav-icons"/>
import { faGear } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faGear} className="nav-icons"/>
*/

interface headingProps{
    measureSwitch: (measure: measureMode) => void;
    siteTypeSwitch: (siteType: siteType) => void;
}

const Heading = ({measureSwitch, siteTypeSwitch}: headingProps) => {
    const [activeLink, setActiveLink] = useState<siteType>('TimedSite');

    const handleLinkClick = (link: siteType, measure?: measureMode) => {
        setActiveLink(link);
        siteTypeSwitch(link);
        if (measure) measureSwitch(measure);
    }

    const isActiveLink = (link: siteType) => activeLink === link ? 'active' : '';

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
                    <a className={`nav-link ${isActiveLink('TimedSite')}`} onClick={() => {handleLinkClick("TimedSite", "Timed")}}>Timed</a>
                    <a className={`nav-link ${isActiveLink('ClickSite')}`} onClick={() => {handleLinkClick("ClickSite", "Clicks")}}>Clicks</a>
                    <a className={`nav-link ${isActiveLink('LeaderboardSite')}`} onClick={() => {handleLinkClick("LeaderboardSite")}}>Leaderboard</a>
                    <a className={`nav-link ${isActiveLink('SettingsSite')}`} onClick={() => {handleLinkClick("SettingsSite")}}>Settings</a>
                    <a className={`nav-link ${isActiveLink('AboutSite')}`} onClick={() => {handleLinkClick("AboutSite")}}>About</a>
                </div>
                </div>
            </div>
            </nav>
        </header>
    );
}

export default Heading