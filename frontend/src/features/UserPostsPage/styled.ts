import styled from "styled-components";

export const UserPostsStyled = styled.div`
  &.users-posts-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .user-posts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
`;
