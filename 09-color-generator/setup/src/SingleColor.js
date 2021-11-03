import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

const SingleColor = ({ rgb, weight, index }) => {
  const [alert, setAlert] = useState(false);

  const bcg = rgb.join(',');
  const displayedColor = rgbToHex(...rgb).toUpperCase();

  const copyColor = () => {
    setAlert(true);
    navigator.clipboard.writeText(displayedColor)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [alert])

  return <article className={`color ${index > 8 && 'color-light'}`}
    onClick={copyColor}
    style={{ backgroundColor: `rgb(${bcg})` }}>
    <p className="percent-value"> {weight}% </p>
    <p className="color-value"> color: {displayedColor}</p>
    {alert && <p className="alert"> copied to clipboard </p>}
  </article>
}

export default SingleColor
