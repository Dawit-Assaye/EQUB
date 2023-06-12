import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarker, faPhoneAlt, faHome, faFileContract, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-lime-500">
      <div className="container pb-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3">
            <h4 className=" font-bold mb-4 text-4xl">EQUB</h4>
            <ul className="companyInfo">
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-lime-500" />
                Email: equb@gmail.com
              </li>
              <li>
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-lime-500" />
                Phone: +251 (093) 522-8706
              </li>
              <li>
                <FontAwesomeIcon icon={faMapMarker} className="mr-2 text-lime-500" />
                Address: Debre Tabor, Amhara, Ethiopia
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <ul className="list-none">
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-4">Site Map</h4>
            <ul className="list-none">
              <li>
                <Link to="/" className="hover:text-white">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  <FontAwesomeIcon icon={faFileContract} className="mr-2" />
                  Terms and Conditions
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-lime-500">
                  Contact Us
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Equb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
