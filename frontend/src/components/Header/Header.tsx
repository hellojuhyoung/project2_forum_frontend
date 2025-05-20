import clsx from "clsx";
import { HeaderStyled } from "./styled";

// antd dropdown menu for profile option
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, notification, Space } from "antd";

// import libraries related to cookies
import { deleteCookie } from "cookies-next";
import { clearUser } from "@/redux/redux";

// import libraries for redux store
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";

interface HeaderProps {
  isLoggedIn: boolean;
}

// from the 'header' component pass over the 'isLoggedIn' variable as a prop
// declare the variable to be boolean and render different tags
const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  // import variables from redux store
  const id = authentication.id;
  const username = authentication.username;

  // function directs user to the login page
  async function directToLogin() {
    router.push("/auth/login");
  }

  // function directs user to the signup page
  async function directToSignup() {
    router.push("/auth/signup");
  }

  // function directs user to create new post
  async function directToCreatePost() {
    router.push("posts/create");
  }

  // function directs user to user posts
  async function direcToUsersPosts() {
    router.push({
      pathname: "/posts/user",
      query: { userid: id },
    });
  }

  //
  // need to add user profile page
  //

  // function handles logout of the user
  const handleLogout = async () => {
    deleteCookie("token");
    dispatch(clearUser());
    // router.push("/").then(() => {
    //   router.reload();
    // });
    notification.error({
      message: "you are logged out",
    });
    router.push("/");
  };

  // declare dropdown menu items
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="https://www.antgroup.com">
          account
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={handleLogout} style={{ cursor: "pointer" }}>
          logout
        </div>
      ),
    },
  ];

  return (
    // ternary operator to decide what menu options to render
    <HeaderStyled className={clsx("header-container")}>
      {isLoggedIn ? (
        <>
          <header className="header">
            <div>where logo is placed</div>

            <nav className="navigation-bar">
              <ul>
                <li onClick={directToCreatePost} style={{ cursor: "pointer" }}>
                  create new post
                </li>
                <li onClick={direcToUsersPosts} style={{ cursor: "pointer" }}>
                  my posts
                </li>
                <li>hello {username}</li>
                <li>
                  <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Profile
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </nav>
          </header>
        </>
      ) : (
        <>
          <header className="header">
            <div>where logo is placed</div>

            <nav className="navigation-bar">
              <ul>
                <li>
                  <div onClick={directToLogin} style={{ cursor: "pointer" }}>
                    login
                  </div>
                </li>
                <li>
                  <div onClick={directToSignup} style={{ cursor: "pointer" }}>
                    signup
                  </div>
                </li>
              </ul>
            </nav>
          </header>
        </>
      )}
    </HeaderStyled>
  );
};

export default Header;
