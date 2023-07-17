import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './TopNavbar.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function TopNavbar() {
    // checks if the screen size is less than 992px, in which case the navbar will collapse
    const [navCollapse, setNavCollapse] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const screenSize = window.matchMedia('(max-width: 992px)').matches;
            setNavCollapse(screenSize);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="/" className={`${navCollapse ? 'brand' : 'brand-padding'}`}>Spotify Proximity</Navbar.Brand>
                <Navbar.Toggle id="basic-navbar-toggle" aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/songs" style={navCollapse ? { borderTop: '1px solid black' } : {}} className={`${navCollapse ? 'row-padding' : 'link-padding'} link-dec`}>Songs</Link>
                        <Link to="/history" className={`${navCollapse ? 'row-padding' : ''} link-dec`}>History</Link>
                    </Nav>
                    <Nav className={`${navCollapse ? '' : 'nav-padding'}`}>
                        <Link to="/login" className={`${navCollapse ? 'row-padding' : 'link-padding'} link-dec`}>Login</Link>
                        <Link to="/signup" className={`${navCollapse ? 'row-padding' : 'link-signup'} link-dec`}>Sign Up</Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default TopNavbar;