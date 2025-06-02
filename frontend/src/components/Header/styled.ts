import { styled } from "styled-components";
import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const HeaderStyled = styled.div`
  &.header-container {
    width: 100%;
    height: 80px;
    background-color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme }) => theme.colors.textLight};

    .header {
      display: flex;
      max-width: 1280px;
      height: 100%;
      margin: 0 auto;
      align-items: center;
      justify-content: space-between;
    }

    .navigation-bar {
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
        margin-left: 50px;
      }
    }
  }
`;

// Styled component for the actual profile picture image
export const StyledAvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
`;

// Styled component for the fallback user icon
export const StyledUserIcon = styled(UserOutlined)`
  font-size: 24px; /* Adjust size as needed */
  color: #1890ff; /* Ant Design primary blue, or your theme color */
  margin-right: 8px;
`;
