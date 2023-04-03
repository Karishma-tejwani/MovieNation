import React from "react";
import ContentWrap from "./contentWrap";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrap>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Movie Nation is a platform that offers a wide variety of movies and TV shows to users.
                    The platform provides information on trending, upcoming, and popular movies and TV shows.
                    Users can easily access and stream their favorite content on Movie Nation.
                    Additionally, Movie Nation may also offer recommendations based on a user's viewing history and preferences.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrap>
        </footer>
    );
};

export default Footer;