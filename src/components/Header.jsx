import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrap from "./ContentWrap";
import logo from "../assets/logo.png";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const searchHandler = (e) => {
      if(e.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`)
        setTimeout(() => {
          setShowSearch(false)
        },1000)
      }
    }

    const openSearch = () => {
      setMobileMenu(false);
      setShowSearch(true);
    }

    const openMobileMenu = () => {
      setMobileMenu(true);
      setShowSearch(false);
    }

    const navigationHandler = (type) => {
      if(type === "movie"){
        navigate("/explore/movie");
      }
      else{
        navigate("/explore/tv");
      }
      setMobileMenu(false);
    }

    const controlNav = () => {
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");
        }
        else{
          setShow("show");
        }
      }
      else{
        setShow("top");
      }
      setLastScrollY(window.scrollY);
    }

    useEffect(() => {
      window.addEventListener("scroll", controlNav);
      return () => {
        window.removeEventListener("scroll", controlNav);
      }
    }, [lastScrollY])

    useEffect (() => {
      window.scrollTo(0, 0);
    }, [location])

    const navigation = () => {
      navigate("/");
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
          <ContentWrap>
            <div className="logo">
              <img src={logo} alt="Logo" onClick={navigation} />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
              <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
              <li className="menuItem"><GoSearch onClick={openSearch} /></li>
            </ul>

            <div className="mobileMenuItems">
              <GoSearch onClick={openSearch} />
              {mobileMenu ? <AiOutlineClose onClick={() => setMobileMenu(false)} /> : <AiOutlineMenu onClick={openMobileMenu} /> }
            </div>
          </ContentWrap>
          {showSearch && (
            <div className="searchBar">
              <ContentWrap>
                <div className="searchInput">
                  <input 
                    type='text' 
                    placeholder='Search Here'
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchHandler}  
                  />
                  <AiOutlineClose onClick={() => setShowSearch(false)} />
                </div>
              </ContentWrap>
            </div>
          )}
        </header>
    );
};

export default Header;