// frontend/src/components/Margins/Margins.tsx

// import preset header and footer components and combine them into margins
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// styling attributes
import { MarginsStyled } from "./styled";
import clsx from "clsx";

import { useRouter } from "next/router";
import React, { useState } from "react"; // Added React and useState for state management

// aquire token from redux store
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface MarginsProps {
  children: React.ReactNode;
}

const Margins: React.FC<MarginsProps> = (props) => {
  const router = useRouter();
  // declare the urls in the noMargins array to specify
  // which routes you want to exclude having margins
  const noMargins = ["/auth/signup"];
  // with the built-in function 'includes' to find that url
  // and check with 'pathname'
  const hiddenMargins = noMargins.includes(router.pathname);

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );
  const token = authentication.token;
  const isLoggedIn = !!token;

  // State to trigger a refresh of the profile picture in the Header component
  const [profilePictureRefreshKey, setProfilePictureRefreshKey] = useState(0);

  // Function to increment the key, which will cause Header's useEffect to re-run
  const triggerProfilePictureRefresh = () => {
    setProfilePictureRefreshKey((prevKey) => prevKey + 1);
  };

  // Determine if the current page is the profile update page where the image can be changed
  const isProfileUpdatePage = router.pathname === "/account/update"; // Ensure this path matches your profile update page

  // with the '&&' signs for both header and footer to decide
  // whether to render the margins or not
  return (
    <MarginsStyled className={clsx("margins-container")}>
      <div>
        {!hiddenMargins && (
          <Header
            isLoggedIn={isLoggedIn}
            // Pass the refresh key to the Header, it will re-render when this key changes
            refreshProfilePictureKey={profilePictureRefreshKey}
          />
        )}
        <main>
          {/*
            We use React.Children.map and React.cloneElement to pass
            the `onProfilePictureChange` function to the child component
            (which is typically the Next.js page component, like ProfileUpdatePage).
            This allows the child to trigger a header refresh.
          */}
          {React.Children.map(props.children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                // Only pass the function if it's the profile update page
                ...(isProfileUpdatePage && {
                  onProfilePictureChange: triggerProfilePictureRefresh,
                }),
                // Ensure existing props from _app.tsx are merged
                ...(child.props || {}),
              });
            }
            return child;
          })}
        </main>
        {!hiddenMargins && <Footer />}
      </div>
    </MarginsStyled>
  );
};

export default Margins;
