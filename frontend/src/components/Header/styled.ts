import { styled } from "styled-components";
import { Image } from "antd"; // Keep Image import if it's used elsewhere or for clarity
import { UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons"; // Import necessary Ant Design icons

export const HeaderStyled = styled.div`
  &.header-container {
    width: 100%;
    height: 80px; /* Base height for desktop */
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.textLight};
    box-sizing: border-box; /* Ensures padding is included in the element's total width and height */

    /* Responsive adjustments for header height and overall padding */
    @media (max-width: 992px) {
      height: 70px; /* Slightly shorter on tablets/laptops */
    }

    @media (max-width: 768px) {
      height: 60px; /* Even shorter on tablets */
      padding: 0 15px; /* Add some horizontal padding on tablets */
    }

    @media (max-width: 576px) {
      height: 55px; /* Compact height on mobile */
      padding: 0 10px; /* Add more horizontal padding on very small screens */
    }

    .header {
      display: flex;
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px; /* Add default horizontal padding for content inside .header */

      /* Adjust internal padding for header content */
      @media (max-width: 1280px) {
        padding: 0 15px; /* Adjust padding if max-width is hit */
      }

      @media (max-width: 768px) {
        padding: 0 10px; /* Smaller padding on tablets */
      }

      @media (max-width: 576px) {
        padding: 0 5px; /* Minimal padding on mobile */
      }
    }

    .logo-section {
      /* Adjust logo section styling if needed. In your Header.tsx, this is just the img div */
    }

    .navigation-bar {
      /* Desktop navigation bar - hidden on smaller screens */
      &.desktop-nav {
        /* This class is added in Header.tsx to hide this nav */
        @media (max-width: 768px) {
          display: none; /* Hide desktop nav on tablets and below */
        }
      }
      ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
      }
      li {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      li + li {
        margin-left: 50px; /* Base spacing between nav items */

        /* Adjust spacing between nav items for smaller screens */
        @media (max-width: 992px) {
          margin-left: 30px;
        }
      }
    }

    .user-and-language-section {
      /* This section implicitly combines the user profile/auth and language switcher */
      display: flex; /* Ensure these items stay in a row */
      align-items: center;
      gap: 20px; /* Space between user profile/auth and language switcher */

      @media (max-width: 768px) {
        gap: 15px;
      }
    }

    .user-profile-section {
      /* This is the container for profile image/icon and dropdown */
      display: flex;
      align-items: center;

      .profile-info {
        display: flex;
        align-items: center;
        span {
          /* The "Welcome, username" or "My Profile" text */
          font-size: 1rem;
          white-space: nowrap; /* Prevent text wrapping */
          @media (max-width: 992px) {
            font-size: 0.9rem;
          }
          @media (max-width: 768px) {
            display: none; /* Hide text on smaller screens, just show icon/dropdown */
          }
        }
      }

      .auth-buttons {
        display: flex;
        gap: 10px;

        .ant-btn {
          /* Styling for Ant Design login/signup buttons */
          font-size: 0.9rem;
          padding: 5px 12px;
          height: auto; /* Allow Ant Design button height to adjust */

          @media (max-width: 992px) {
            font-size: 0.85rem;
            padding: 4px 10px;
          }
          @media (max-width: 768px) {
            font-size: 0.8rem;
            padding: 3px 8px;
          }
          @media (max-width: 576px) {
            font-size: 0.75rem; /* Even smaller for mobile */
            padding: 2px 6px;
          }
        }
      }
    }

    .mobile-menu-toggle {
      display: none; /* Hidden by default on desktop */
      cursor: pointer;
      font-size: 28px; /* Size of the hamburger/close icon */
      z-index: 1001; /* Ensure it's above other header elements */
      color: ${({ theme }) => theme.colors.textLight}; /* Icon color */

      @media (max-width: 768px) {
        display: block; /* Show hamburger icon on tablets and below */
      }

      @media (max-width: 576px) {
        font-size: 24px; /* Smaller icon on mobile */
      }
    }
  }
`;

// Styled component for the actual profile picture image
export const StyledAvatarImage = styled.img`
  width: 32px; /* Base size */
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;

  /* Responsive adjustments for avatar size */
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }

  @media (max-width: 576px) {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

// Styled component for the fallback user icon
export const StyledUserIcon = styled(UserOutlined)`
  font-size: 24px; /* Base size */
  color: ${({ theme }) =>
    theme.colors.textLight}; /* Use theme color for consistency */
  margin-right: 8px;

  /* Responsive adjustments for user icon size */
  @media (max-width: 768px) {
    font-size: 20px;
    margin-right: 6px;
  }

  @media (max-width: 576px) {
    font-size: 18px;
    margin-right: 4px;
  }
`;

// New: Mobile Menu Overlay Styled Component
export const MobileMenuOverlay = styled.div`
  position: fixed; /* Fixed position to cover the viewport */
  /* Top position will depend on your actual header height.
     You MUST define 'headerHeight' in your theme.ts and styled.d.ts. */
  top: ${({ theme }) => theme.headerHeight};
  left: 0;
  width: 100%;
  /* Height will be remaining viewport height minus header height */
  height: calc(100% - ${({ theme }) => theme.headerHeight});
  background-color: ${({ theme }) =>
    theme.colors.primaryDark}; /* Match header background or an accent */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center links vertically */
  align-items: center;
  z-index: 1000; /* Below the toggle icon, above main content */
  transform: translateX(100%); /* Start off-screen to the right */
  transition: transform 0.3s ease-in-out; /* Smooth slide animation */
  overflow-y: auto; /* Enable scrolling if menu content is too long */
  padding-bottom: 20px; /* Padding for scrollable content */

  &.is-open {
    transform: translateX(
      0
    ); /* Slide into view when 'is-open' class is present */
  }

  /* Ensure the overlay is ONLY displayed on small screens */
  @media (min-width: 769px) {
    /* Hide on desktop and larger tablets */
    display: none;
  }

  .mobile-nav-links {
    width: 100%;
    text-align: center;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: 20px; /* Space between menu items */
    }
    a,
    div {
      /* Target both <a> tags and <div>s for clickability */
      color: ${({ theme }) => theme.colors.textLight};
      text-decoration: none;
      font-size: 1.1rem; /* Larger font size for mobile menu links */
      font-weight: bold;
      display: block; /* Make the whole area clickable */
      padding: 10px 0; /* Add padding for easier tapping */

      &:hover {
        color: ${({ theme }) => theme.colors.primary}; /* Highlight on hover */
      }
    }
  }
`;

// New: Styled components for Ant Design icons (used in Header.tsx)
export const HamburgerIcon = styled(MenuOutlined)`
  /* Inherits styles from .mobile-menu-toggle parent */
  /* Example: Add a specific hover effect */
  &:hover {
    color: ${({ theme }) => theme.colors.primary}; /* Change color on hover */
  }
`;

export const CloseIcon = styled(CloseOutlined)`
  /* Inherits styles from .mobile-menu-toggle parent */
  /* Example: Increase size slightly for the close icon */
  font-size: 30px;
  /* Example: Add a rotation on hover */
  &:hover {
    transform: rotate(90deg);
    transition: transform 0.2s ease-in-out;
  }
`;
