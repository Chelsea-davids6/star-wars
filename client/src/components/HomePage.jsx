import React from "react";
import Particless from './Particless.jsx';


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
      </div>
    </>
  );
}
export default HomePage;
