import React from "react";
import "./Visit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faQuestionCircle,
  faHistory,
  faGift,
  faChartLine,
  faSearch,
  faCog,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import p1 from "../photo/p1.jpg";
import p2 from "../photo/p2.jpg";
import p3 from "../photo/p3.jpg";
import equb4 from "../photo/equb2.jpg";

function Visit() {
  const navigate = useNavigate();
  const redirectToSignup = ()=>{
  navigate("/signup")
}

  return (
    <div className="visit-container">
      <div className="heading">
        <h1 className="visit-heading">
          Empowering Savings
        Unlocking Futures
        </h1>
        <button onClick={redirectToSignup} className="visit-button bg-fuchsia-800 hover:bg-fuchsia-950">Get Started</button>
        <div className="additional-heading-info">
          <p className="additional-heading-description font-semibold text-lg">
            Welcome to EQUB, the platform that revolutionizes your savings and helps you achieve your financial goals.
          </p>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faQuestionCircle} />
          </div>
          <div className="card-content">
            <h2 className="image-text">What is Equb?</h2>
            <p className="image-description">
              Equb is an alternative means to achieve saving and improve access
              to credit by rotation of savings.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faHistory} />
          </div>
          <div className="card-content">
            <h2 className="image-text">History & Relevance</h2>
            <p className="image-description">
              eQub is traditionally used as a source of credit & as a device to
              promote social commitment & strengthen ties.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faGift} />
          </div>
          <div className="card-content">
            <h2 className="image-text">The Perks</h2>
            <p className="image-description">
              Equb saves money and meets urgent financial needs. Your future is
              as big as your Equb.
            </p>
          </div>
        </div>
      </div>
      <h1 className="steps">
        How to Start Saving your money in a communal rotation?
      </h1>
      <div className="steps-container">
        <div className="step1">
          <h2 className="step-title">Step 1: </h2>
          <h2 className="step-titles"> Become an Equber</h2>
          <p className="step-description">
            <ul>
              <li>
                To become an Equber you'll need a Phone number, an email
                address, a date of birth, a home address. {/* and a valid government
                issued ID. */}
              </li>
              <li>
                After you fill out the signup form rejew our terms of service
                and Privacy policy and you're all set to sign up and become an
                Equber.
              </li>
              <li>
                As an Equber you'll be able to explore and join existing equibs
                or create a new equib.
              </li>
            </ul>
          </p>
        </div>
        <div className="step2">
          <h2 className="step-title">Step 2:</h2>
          <h2 className="step-titles">Join an Equb</h2>
          <p className="step-description">
            <ul>
              <li>
                For the first time ever you'll be able to filter and explore all
                the Equbs on our platform by name.
              </li>
              <li>
                Once you've found an Equb group that meets your regurments you


can join it by sending a 'join request to the admin of the
                Equb..
              </li>
              <li>
                Once you join an Equb you'll be able to sumit payments based on
                the amount circulating and the duration of the subround.
              </li>
            </ul>
          </p>{" "}
        </div>
        <div className="step3">
          <h2 className="step-title">Step 3:</h2>
          <h2 className="step-titles"> Save Money</h2>
          <p className="step-description">
            <ul>
              <li>
                Every time subround that you make a payment that amount is saved
                in the rotation.
              </li>
              <li>
                The total amount of money you have circulated on our platform
                will also be displayed, the higher the better.
              </li>
            </ul>
          </p>
        </div>
        <div className="step4">
          <h2 className="step-title">Step 4:</h2>
          <h2 className="step-titles"> Win the Lottery</h2>
          <p className="step-description">
            <ul>
              <li>
                As every subround of a round of Equb begins you the Wheel of
                Equb will be spun.
              </li>
              <li>
                The lucky member that the wheel has landed on will win the
                multiple of the
              </li>
              <li>
                amount being circulated by every member for that round. By the
                end of the round every member will have won back the money they
                circulated.
              </li>
            </ul>
          </p>{" "}
        </div>
      </div>
      <h1 className="steps"> Features you will love</h1>
      <div className="card-container">
        <div className="cards">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faChartLine} />
          </div>

          <div className="cards">
            <h2 className="image-text">Equb Dashboard</h2>
            <p className="image-description">
              Access your personalized Equb dashboard to track your savings,
              contributions, and earnings.
            </p>
          </div>
        </div>
        <div className="cards">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faSearch} />
          </div>
          <div className="card-content">
            <h2 className="image-text">Explore</h2>
            <p className="image-description">
              Discover and explore a wide range of Equbs tailored to your
              preferences and financial goals.
            </p>
          </div>
        </div>
        <div className="cards">
          <div className="icon-container">
            <FontAwesomeIcon className="card-icon" icon={faCog} />
          </div>
          <div className="card-content">
            <h2 className="image-text">Wheel of Equb</h2>
            <p className="image-description">
              Experience the thrill of the Wheel of Equb, where lucky winners
              have the chance to multiply their contributions.
            </p>
          </div>
        </div>
        
      </div>
      <h1 className="steps">Why People are excited about EQUB platform</h1>


<div className="testimonials-container">
        <div className="testimonial">
          <img className="testimonial-image" src={p1} alt="User profile" />
          <h3 className="testimonial-name">Nahom Adane</h3>
          <p className="testimonial-description">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon"/>Equb has revolutionized the way I save money. It's easy to use, and
            I love the sense of community it brings."
          </p>
        </div>
        <div className="testimonial">
          <img className="testimonial-image" src={p2} alt="User profile" />
          <h3 className="testimonial-name">Hannan husen</h3>
          <p className="testimonial-description">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon"/>I have been a part of Equb for years, and it has helped me achieve
            my financial goals. I highly recommend it to everyone."
          </p>
        </div>
        <div className="testimonial">
          <img className="testimonial-image" src={p3} alt="User profile" />
          <h3 className="testimonial-name">Estifanos Ababu</h3>
          <p className="testimonial-description">
          <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon"/>Winning the lottery in Equb was an incredible experience. It gave
            me the boost I needed to pursue my dreams. Thank you, Equb!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Visit;