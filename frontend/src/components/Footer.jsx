import { Link } from "react-router-dom";
import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <ul className="companyInfo">
              <li>
                Email: info@myequb.com
              </li>
              <li>
               Phone: +1 (123) 456-7890
              </li>
              <li>
                 Address: Debre Tabor University,
                Debre Tabor, Ethiopia
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <ul className="list-unstyled">
              <li>
                  <a href="#">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Site Map</h4>
            <ul className="list-unstyled">
              <li>
               <Link to="/">Home</Link> 
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row-2">
            <p className="text-centerf">
              &copy; 2023 MyEqub. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
