import styled from "styled-components";

export const DetailFeedStyled = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .detail-title {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 8px;
  }

  .detail-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 24px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};

    .detail-category {
      background-color: ${({ theme }) => theme.colors.accentBackground};
      color: ${({ theme }) => theme.colors.primary};
      padding: 4px 10px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      font-weight: 500;
    }

    .detail-username {
      font-weight: 500;
    }

    .detail-createdAt {
      margin-left: 20px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .detail-content {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.75;
    color: ${({ theme }) => theme.colors.textBody};
    white-space: pre-wrap;
    margin-bottom: 36px;
  }

  .detail-main-image {
    margin: 24px 0;

    .main-img {
      width: 100%;
      max-height: 300px;
      object-fit: contain;
      border-radius: ${({ theme }) => theme.borderRadius.md};
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    }
  }

  .detail-gallery {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;

    .gallery-img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }

  .like-section button {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s ease;
  }

  .like-section button:disabled {
    opacity: 1;
    cursor: not-allowed;
  }

  .like-section button.liked {
    color: ${({ theme }) => theme.colors.danger};
  }

  .like-section button:not(.liked) {
    color: ${({ theme }) => theme.colors.textLight};
  }

  .like-section button:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.dangerHover || "#ff3366"};
  }

  .action-buttons {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .edit-btn,
  .delete-btn {
    padding: 10px 20px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .edit-btn {
    background-color: ${({ theme }) => theme.colors.success};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.successDark};
    }
  }

  .delete-btn {
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dangerDark};
    }
  }
`;
