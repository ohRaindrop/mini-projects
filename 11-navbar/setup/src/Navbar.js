import React, { useState, useRef, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { links, social } from './data'
import logo from './logo.svg'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    /*method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.*/
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`
    } else {
      linksContainerRef.current.style.height = '0px';
    }

    //alternative: set height to fit-content
  }, [showLinks])

  return <nav>
    <div className="nav-center">
      <div className="nav-header">
        <img src={logo} alt="logo" />
        <button className="nav-toggle"
          onClick={() => setShowLinks(!showLinks)}>
          <FaBars />
        </button>
      </div>

      <div
        className={`links-container ${showLinks ? 'show-container' : ''}`}
        ref={linksContainerRef}>
        <ul className="links"
          ref={linksRef}>
          {links.map((link) => {
            let { id, url, text } = link;
            return <li key={id}> <a href={url}> {text} </a> </li>
          })}
        </ul>
      </div>

      <ul className="social-icons">
        {social.map((social, index) => {
          let { id, url, icon } = social;
          return <li key={id}> <a href={url}> {icon}  </a> </li>
        })}
      </ul>
    </div>
  </nav>
}

export default Navbar
