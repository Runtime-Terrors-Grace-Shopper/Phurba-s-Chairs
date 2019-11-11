import React from 'react'

const footer = () => {
  return (
    <div>
      <h1>About Us</h1>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            About Phurbiture
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Careers
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Phurbiture Loyalty Program
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Locations
          </a>
        </li>
      </ul>
      <div className="footer">
        <i className="fab fa-facebook-square" />
        <i className="fab fa-instagram" />
        <i className="fab fa-twitter" />
        <h6>
          <i className="far fa-copyright" /> 2019 by Phurbiture, FullStack
          Academy, 11th Floor, New York, NY 10004
        </h6>
      </div>
    </div>
  )
}

export default footer
