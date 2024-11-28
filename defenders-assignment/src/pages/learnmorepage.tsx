import React from "react";
import "./learnmorepagestyles.css";

export default function LearnMorePage() {
  return (
    <div className="LearnMorePage">
      {/* Hero Section */}
      <div className="hero-section">
  <div className="logo-placeholder">[insert logo]</div>
  <h1>Learn More</h1>
  <p>About policy and legal information related to the Defenders of Wildlife mission.</p>
  <p>[insert blurb]</p>
  <button className="read-on-button">Read on ⬇</button>
</div>

      {/* Content Sections */}
      <div className="content-section">
        {/* Featured Readings */}
        <div className="section">
          <h2>Featured Readings</h2>
          <div className="grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card">
                <div className="card-image">[insert image]</div>
                <p className="file-summary">[File summary]</p>
                <span className="arrow">➔</span>
              </div>
            ))}
          </div>
          <button className="see-more-button">See more ⬇</button>
        </div>

        {/* New Publications */}
        <div className="section">
          <h2>New Publications</h2>
          <div className="grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card">
                <div className="card-image">[insert image]</div>
                <p className="file-summary">[File summary]</p>
                <span className="arrow">➔</span>
              </div>
            ))}
          </div>
          <button className="see-more-button">See more ⬇</button>
        </div>

        {/* Important Readings */}
        <div className="section">
          <h2>Important Readings</h2>
          <div className="grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card">
                <div className="card-image">[insert image]</div>
                <p className="file-summary">[File summary]</p>
                <span className="arrow">➔</span>
              </div>
            ))}
          </div>
          <button className="see-more-button">See more ⬇</button>
        </div>
        </div>
      </div>
  );
}