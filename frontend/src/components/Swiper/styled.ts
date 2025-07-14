import { styled } from "styled-components";
import { Swiper } from "swiper/react";

export const SwiperStyled = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) =>
      theme.colors.primary}; /* Use primary color for arrows */
    background-color: rgba(
      255,
      255,
      255,
      0.8
    ); /* Semi-transparent white background */
    border-radius: 50%; /* Make them circular */
    width: 40px; /* Adjust size */
    height: 40px; /* Adjust size */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    transition: all 0.3s ease; /* Smooth transition for hover effects */

    /* Position arrows slightly inside the container, but not over the image */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Adjust for vertical centering */

    &::after {
      /* Swiper uses ::after for the actual arrow icon */
      font-size: 18px; /* Adjust arrow icon size */
      font-weight: bold;
    }

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.primary}; /* Solid primary on hover */
      color: ${({ theme }) =>
        theme.colors.backgroundLight}; /* White text on hover */
    }

    /* Hide arrows on smaller screens where swiping is primary */
    @media (max-width: 768px) {
      display: none;
    }
  }

  .swiper-button-prev {
    left: 10px; /* Position from left edge */
  }

  .swiper-button-next {
    right: 10px; /* Position from right edge */
  }

  /* Ensure the swiper container itself has relative positioning if needed
     for arrow positioning, though Swiper usually handles this. */
  position: relative;
`;
