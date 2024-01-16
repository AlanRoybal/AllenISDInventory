import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/logo.svg";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
        </div>

        <ul className="home-links">
          <li>
          <button className="--btn --btn-primary">
            <Link to="/register">Register</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Allen ISD Inventory Management System</h2>
          <p>
            An inventory app for tracking items inputted with a barcode reader.
          </p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/register">Create An Account</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="21K" text="Students" />
            <NumberText num="2.7K" text="Active Staff" />
            <NumberText num="1" text="Solution" />
          </div>
        </div>

        <div className="hero-image">
          <img className="hero-picture" src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;