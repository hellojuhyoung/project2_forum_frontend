// frontend/src/components/Header/Header.tsx
import React, { useEffect, useState } from "react"; // Keep useState for mobile menu
import clsx from "clsx";
import {
  HeaderStyled,
  StyledAvatarImage,
  StyledUserIcon,
  MobileMenuOverlay, // Import new styled component
  HamburgerIcon, // Import new styled component for burger
  CloseIcon, // Import new styled component for close 'X'
} from "./styled";

// Ant Design imports
import {
  DownOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons"; // Add MenuOutlined, CloseOutlined
import type { MenuProps } from "antd";
import { Dropdown, notification, Space } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

// import libraries related to cookies
import { deleteCookie } from "cookies-next";
import { clearUser } from "@/redux/redux";

// import libraries for redux store
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { instance } from "@/utils/apis/axios";

interface HeaderProps {
  isLoggedIn: boolean;
  refreshProfilePictureKey?: number;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  refreshProfilePictureKey,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("Margins.header"); // Initialize useTranslation

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  const id = authentication.id;
  const username = authentication.username;

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [imageLoadError, setImageLoadError] = useState(false);
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (isLoggedIn && id) {
      const fetchProfilePicture = async () => {
        try {
          const response: any = await instance.get(`/users/${id}`);
          setProfilePicture(response.user.profilePicture);
          setImageLoadError(false);
        } catch (error) {
          console.error("error fetching profile picture", error);
          setProfilePicture(null);
          setImageLoadError(true);
        }
      };
      fetchProfilePicture();
    } else {
      setProfilePicture(null);
      setImageLoadError(false);
    }
  }, [id, isLoggedIn, refreshProfilePictureKey]);

  // Handler for image loading errors
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    console.error("Profile image failed to load:", e.currentTarget.src);
    setImageLoadError(true); // Set the flag to true
    e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails (though we're not using a fallback image here)
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  async function directToHome() {
    router.push("/");
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  async function directToLogin() {
    router.push("/auth/login");
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  async function directToSignup() {
    router.push("/auth/signup");
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  async function directToCreatePost() {
    router.push("/posts/create");
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  async function direcToUsersPosts() {
    router.push({
      pathname: "/posts/user",
      query: { userid: id },
    });
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  async function directToProfile() {
    router.push({
      pathname: "/account/profile",
      query: { userid: id },
    });
    setIsMobileMenuOpen(false); // Close menu on navigation
  }

  const handleLogout = async () => {
    // deleteCookie("token");
    // dispatch(clearUser());
    // notification.success({
    //   message: t("notification_logout_message"),
    //   placement: "topRight",
    // });
    // router.push("/");
    // setIsMobileMenuOpen(false); // Close menu on logout
    try {
      await instance.post("/auth/logout"); // server will clear the cookie
      dispatch(clearUser());
      localStorage.removeItem("username");
      localStorage.removeItem("password");

      notification.success({
        message: t("notification_logout_message"),
        placement: "topRight",
      });
      router.push("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Language switcher handler
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false); // Close menu on language change
  };

  const profileDropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={directToProfile} style={{ cursor: "pointer" }}>
          {t("dropdown_profile")}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
          {t("dropdown_logout")}
        </div>
      ),
    },
  ];

  const renderLanguageSwitcher = () => (
    <Space>
      <span
        onClick={() => changeLanguage("ko")}
        style={{
          cursor: "pointer",
          fontWeight: i18n.language === "ko" ? "bold" : "small",
          color: i18n.language === "ko" ? "#1890ff" : "inherit",
        }}
      >
        {t("language_kor")}
      </span>

      <span
        onClick={() => changeLanguage("en")}
        style={{
          cursor: "pointer",
          fontWeight: i18n.language === "en" ? "bold" : "small",
          color: i18n.language === "en" ? "#1890ff" : "inherit",
        }}
      >
        {t("language_eng")}
      </span>
    </Space>
  );

  return (
    <HeaderStyled className={clsx("header-container")}>
      <header className="header">
        {/* Logo Section */}
        <div onClick={directToHome} style={{ cursor: "pointer" }}>
          <img
            src="/forum_logo.png"
            alt={t("alt_forum_logo")}
            style={{ width: "60px", height: "50px" }}
          />
        </div>

        {/* Desktop Navigation (visible on large screens) */}
        <nav className="navigation-bar desktop-nav">
          {" "}
          {/* Added desktop-nav class */}
          <ul>
            {isLoggedIn ? (
              <>
                <li onClick={directToCreatePost} style={{ cursor: "pointer" }}>
                  {t("nav_create_new_post")}
                </li>
                <li onClick={direcToUsersPosts} style={{ cursor: "pointer" }}>
                  {t("nav_my_posts")}
                </li>
                <li>{t("nav_welcome_user", { username: username })}</li>
                <li>
                  <Dropdown menu={{ items: profileDropdownItems }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {profilePicture && !imageLoadError ? (
                          <StyledAvatarImage
                            src={`${BACKEND_BASE_URL}${profilePicture}`}
                            alt={t("alt_user_profile_image")}
                            onError={handleImageError} // Use the new handler
                          />
                        ) : (
                          <StyledUserIcon /> // Show StyledUserIcon if no profilePicture or if image fails to load
                        )}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </li>
                <li>{renderLanguageSwitcher()}</li>
              </>
            ) : (
              <>
                <li>
                  <div onClick={directToLogin} style={{ cursor: "pointer" }}>
                    {t("nav_login")}
                  </div>
                </li>
                <li>
                  <div onClick={directToSignup} style={{ cursor: "pointer" }}>
                    {t("nav_signup")}
                  </div>
                </li>
                <li>{renderLanguageSwitcher()}</li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Toggle (Hamburger/Close Icon) */}
        <div className="mobile-menu-toggle">
          {isMobileMenuOpen ? (
            <CloseIcon
              onClick={toggleMobileMenu}
              aria-label={t("close_menu")}
            />
          ) : (
            <HamburgerIcon
              onClick={toggleMobileMenu}
              aria-label={t("open_menu")}
            />
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay className={clsx({ "is-open": isMobileMenuOpen })}>
        <nav className="mobile-nav-links">
          <ul>
            {/* Common Links */}
            <li>
              <div onClick={directToHome} style={{ cursor: "pointer" }}>
                {t("home_link_mobile")}
              </div>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <div
                    onClick={directToCreatePost}
                    style={{ cursor: "pointer" }}
                  >
                    {t("nav_create_new_post_mobile")}
                  </div>
                </li>
                <li>
                  <div
                    onClick={direcToUsersPosts}
                    style={{ cursor: "pointer" }}
                  >
                    {t("nav_my_posts_mobile")}
                  </div>
                </li>
                <li>
                  <div onClick={directToProfile} style={{ cursor: "pointer" }}>
                    {t("dropdown_profile_mobile")}
                  </div>
                </li>
                <li>
                  <div onClick={handleLogout} style={{ cursor: "pointer" }}>
                    {t("dropdown_logout_mobile")}
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <div onClick={directToLogin} style={{ cursor: "pointer" }}>
                    {t("nav_login_mobile")}
                  </div>
                </li>
                <li>
                  <div onClick={directToSignup} style={{ cursor: "pointer" }}>
                    {t("nav_signup_mobile")}
                  </div>
                </li>
              </>
            )}
            {/* Language Switcher for Mobile */}
            <li>{renderLanguageSwitcher()}</li>
          </ul>
        </nav>
      </MobileMenuOverlay>
    </HeaderStyled>
  );
};

export default Header;
