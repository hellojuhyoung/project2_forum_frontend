// Assuming this is in your styled.ts file for FooterStyled
import styled from "styled-components";

export const FooterStyled = styled.div`
  background-color: #282c34; /* Dark background */
  color: #f8f8f8; /* Light text */
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */

  footer {
    max-width: 1200px; /* Limit width for larger screens */
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap; /* Allow sections to wrap on smaller screens */
    justify-content: space-between;
    gap: 30px; /* Space between sections */
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%; /* Take full width of footer */
  }

  .footer-section {
    flex: 1; /* Distribute space among sections */
    min-width: 180px; /* Minimum width before wrapping */
    margin-bottom: 20px; /* Space below sections on wrap */

    h3,
    h4 {
      color: #00bcd4; /* Accent color for headings */
      margin-bottom: 15px;
      font-size: 1.1em;
    }

    p {
      font-size: 0.9em;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 8px;
    }

    a {
      color: #f8f8f8;
      text-decoration: none;
      font-size: 0.9em;

      &:hover {
        color: #00bcd4; /* Hover accent color */
        text-decoration: underline;
      }
    }
  }

  .footer-section.about {
    flex-basis: 30%; /* Give more space to the about section */
    min-width: 250px;
  }

  .social-links a {
    display: inline-block;
    color: #f8f8f8;
    margin-right: 15px;
    font-size: 1.2em; /* Size for social icons */
    transition: color 0.3s ease;

    &:hover {
      color: #00bcd4;
    }
  }

  .footer-divider {
    width: 1px; /* Vertical line */
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 20px;

    @media (max-width: 768px) {
      display: none; /* Hide vertical divider on small screens */
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-top: 30px;
    text-align: center;

    p {
      font-size: 0.8em;
      color: #bbbbbb;
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    footer {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .footer-section {
      flex-basis: 100%; /* Stack sections vertically */
      min-width: unset;
      margin-bottom: 20px;
    }

    .footer-section.about {
      flex-basis: 100%;
    }
  }
`;
