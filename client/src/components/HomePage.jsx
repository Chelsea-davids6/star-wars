import React from "react";
import Particless from './Particless.jsx';
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <>
      <Particless />
      <div className="center-text" style={{ textAlign: "center", padding: "20px" }}>
        <h1 style={{ fontFamily: "starwarsfont", color: "yellow" }}>
          Welcome to the Star Wars Character Comparison Website
        </h1>
        <p style={{ fontFamily: "starwarsfont", color: "white" }}>
          This website allows you to compare Star Wars characters and view their attributes!
        </p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/compare" style={{ textDecoration: "none" }}>
            <button style={{ margin: 15 }}>Compare Characters</button>
          </Link>
          <Link to="/characters" style={{ textDecoration: "none", marginLeft: "10px" }}>
            <button style={{ margin: 15 }}>View All Characters</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomePage;
