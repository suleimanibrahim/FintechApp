import React, { useState } from "react";
import "./landing_page.css";
import { RiFolderLockLine } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { BiCheckShield } from "react-icons/bi";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <ul className="desktop">
          <div>
            <li className="logo">Fintech.africa</li>
          </div>
          <div className="navbar">
            <Link to="#">
              <li>Home</li>
            </Link>
            <a href="#">
              <li>Features</li>
            </a>
            <a href="#">
              <li>About</li>
            </a>
            <a href="#">
              <li>Contact Us</li>
            </a>
          </div>
          <div className="register-nav">
            <a href="/login">
              <li>Login</li>
            </a>
            <a href="/signup">
              <li>Create an account</li>
            </a>
          </div>
        </ul>

        <div className="mobile">
          <div>
            <span className="logo">Fintech.africa</span>
          </div>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="drawer"
            aria-controls="navbar-cta"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className={isOpen ? "block" : "hidden"} id="navbar-cta">
          <ul className="dropdown">
            <div className="navbar">
              <Link to="#">
                <li>Home</li>
              </Link>
              <a href="#">
                <li>Features</li>
              </a>
              <a href="#">
                <li>About</li>
              </a>
              <a href="#">
                <li>Contact Us</li>
              </a>
            </div>
            <div className="register-nav">
              <a href="/login">
                <li>Login</li>
              </a>
              <a href="/signup">
                <li>Create an account</li>
              </a>
            </div>
          </ul>
        </div>
      </nav>

      <header id="main-header">
        <div className="header-head">
          <h1>Quick and easy payment platform for all your transactions</h1>
          <p className="header-body">
            Save and manage all your transactions in one place, easy payment
            anytime and any day
          </p>
          <div>
            <a href="/signup">Create an account</a>
          </div>
        </div>
        <div className="header-img">
          <img
            src="/images/header_image.png"
            alt="Man happily doing transaction"
            className="img"
          />
        </div>
      </header>

      <section className="section-1">
        <div className="section-text">
          <h2>Get the convenience of transacting with our services</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea amet
            explicabo provident rerum.
          </p>
        </div>
        <div className="section-icons">
          <div className="section-1_row-1">
            <div className="keeping-secrecy">
              <span>
                <RiFolderLockLine className="folder-icon" />
              </span>
              <p>Keeping secrecy</p>
            </div>
            <div className="convenient-transaction">
              <span>
                <AiOutlineTransaction className="transaction-icon" />
              </span>
              <p>Convenient transaction</p>
            </div>
          </div>
          <div className="section-1_row-2">
            <div className="free-transaction">
              <span>
                <GrTransaction className="free-icon" />
              </span>
              <p>Free transaction</p>
            </div>
            <div className="security-guaranteed">
              <span>
                <BiCheckShield className="shield-icon" />
              </span>
              <p>Security guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-2">
        <div className="section-2_col-1">
          <img src="/images/Transaction.png" alt="card to cash transaction" />
        </div>
        <div className="section-2_col-2">
          <h2>Choose how you want to make transfers</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            eligendi consequuntur aperiam consectetur.
          </p>
        </div>
      </section>

      <section className="section-3">
        <div className="section-3_col-1">
          <div className="section-3_info">
            <h2>How it works</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus, beatae.
            </p>
          </div>

          <div className="step-one">
            <div className="sign-in-icon">
              <img src="/images/Ellipse 20.png" alt="" />
              <img src="/images/Ellipse 19.png" alt="" className="dot" />
              <div className="lineDiv">
                <img src="/images/Line 1.png" alt="" className="line" />
              </div>
            </div>
            <div className="sign-in-text">
              <p>STEP ONE</p>
              <h4>Sign in or Sign up to your account</h4>
              <p className="step-paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
                odit!
              </p>
            </div>
          </div>

          <div className="step-two">
            <div className="transfer-icon">
              <img src="/images/Ellipse 20.png" alt="" />
              <img src="/images/Ellipse 19.png" alt="" className="dot" />
              <div className="lineDiv">
                <img src="/images/Line 1.png" alt="" className="line" />
              </div>
            </div>
            <div className="transfer-text">
              <p>STEP TWO</p>
              <h4>Click transfer on your dashboard</h4>
              <p className="step-paragraph">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aperiam, dolor.
              </p>
            </div>
          </div>

          <div className="step-three">
            <div className="bank-choice-icon">
              <img src="/images/Ellipse 20.png" alt="" />
              <img src="/images/Ellipse 19.png" alt="" className="dot" />
              <div className="lineDiv">
                <img src="/images/Line 1.png" alt="" className="line" />
              </div>
            </div>
            <div className="bank-choice-text">
              <p>STEP THREE</p>
              <h4>Select your desired bank and send</h4>
              <p className="step-paragraph">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Perferendis, neque!
              </p>
            </div>
          </div>
        </div>

        <div className="section-3_col-2">
          <img className="img" src="/images/happy_girl.png" alt="Happy Girl" />
        </div>
      </section>

      <section className="section-4">
        <div className="feedback-heading">
          <h2>Hear from our customers</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
            facilis. Id architecto repellat alias.
          </p>
        </div>
        <div className="cards">
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
          <div className="customer-feedback">
            <h6>Adekola Johnson</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
              facilis. Id architecto repellat alias.
            </p>
          </div>
        </div>
      </section>

      <article className="article-container">
        <div className="article-newsletter">
          <h1>Subscribe to our newsletter</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
            exercitationem numquam error animi dignissimos doloremque, officiis
            culpa minima similique quas eveniet optio laboriosam.
          </p>
        </div>
        <div className="article-form">
          <form action="#" method="GET">
            <label htmlFor="Email"></label>
            <input placeholder="@ Email" className="articleInput"></input>

            <button id="btn">Subscribe</button>
          </form>
        </div>
        <div className="article-disclaimer">
          <p>We will never spam you. Only useful mails with promo and events</p>
        </div>
      </article>

      <footer>
        <ul className="footer-row-1">
          <div>
            <li className="landingpage-name">Fintech.africa</li>
          </div>
          <div className="footer-lists">
            <li>Home</li>
            <li>About Us</li>
            <li>Features</li>
            <li>Contact Us</li>
          </div>
          <div className="socialMedia_logo">
            <a href="#" target="_blank">
              <GrFacebookOption className="s-logo" />
            </a>
            <a href="#" target="_blank">
              <AiOutlineTwitter className="s-logo" />
            </a>
            <a href="#" target="_blank">
              <GrLinkedinOption className="s-logo" />
            </a>
            <a href="#" target="_blank">
              <AiOutlineGoogle className="s-logo" />
            </a>
          </div>
        </ul>
        <ul className="footer-row-2">
          <div>
            <li className="copyRight">&copy; 2022 All rights reserved</li>
          </div>
          <div className="footer-list">
            <li>Privacy Policy</li>
            <li>Terms of conditions</li>
            <li>Legal</li>
            <li>Help</li>
          </div>
          <div>
            <li className="version">English version</li>
          </div>
        </ul>
      </footer>
    </>
  );
}

export default LandingPage;
