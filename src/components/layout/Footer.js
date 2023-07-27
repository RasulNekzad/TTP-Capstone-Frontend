import "./Footer.css"
import GithubLogo from "../../assets/github.png"

function Footer() {
    const redirectToGithub = () => {
        window.open("https://github.com/RasulNekzad/TTP-Capstone-Frontend", "_blank");
    }

    return (
        <footer className="footer">
            <div className="footer__text">Spotify Proximity | TTP Capstone Group 5</div>
            <div className="fancy-hr"></div>
            <button type="button" onClick={redirectToGithub}><img src={GithubLogo} alt="github logo" className="footer__logo"/></button>
        </footer>
    )
}

export default Footer;