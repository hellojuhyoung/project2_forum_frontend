import styled from "styled-components";

export const ProfileStyled = styled.div`
  // Overall container for the profile page, similar to header's max-width
  max-width: 800px; // A bit narrower than the header for profile content
  margin: ${({ theme }) => theme.spacing.xl} auto; // Center it with top/bottom margin
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) =>
    theme.colors.backgroundLight}; // White background for the card
  border-radius: ${({ theme }) => theme.borderRadius.lg}; // Rounded corners
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); // Soft shadow for a card effect
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally within the card
  gap: ${({ theme }) => theme.spacing.lg}; // Space between major sections

  h1 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  // Styles for the profile picture container
  .profile-picture-container {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border-radius: 50%; // Make it round
    overflow: hidden; // Ensure image stays within the circle
    border: 3px solid ${({ theme }) => theme.colors.primary}; // A nice border around the picture
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // Small shadow for the image
    width: 150px; // Fixed size for the image container
    height: 150px;
    display: flex; // To center the image if needed
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // Ensures the image fills the circle without distortion
    }
  }

  // Styles for the details section
  .profile-details {
    width: 100%;
    display: grid; // Use grid for a clean two-column layout
    grid-template-columns: 1fr; // Default to single column on small screens
    gap: ${({ theme }) => theme.spacing.md}; // Space between detail items

    @media (min-width: 768px) {
      // Two columns on larger screens
      grid-template-columns: repeat(2, 1fr);
      gap: ${({ theme }) => theme.spacing.lg};
    }
  }

  // Styles for individual detail items
  .detail-item {
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border}; // Subtle separator
    &:last-child {
      border-bottom: none; // No border on the last item
    }

    strong {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: ${({ theme }) => theme.fontWeights.medium};
      margin-right: ${({ theme }) =>
        theme.spacing.xs}; // Space between label and value
      font-size: ${({ theme }) => theme.fontSizes.md};
    }

    span {
      color: ${({ theme }) => theme.colors.textBody};
      font-size: ${({ theme }) => theme.fontSizes.md};
    }
  }

  // If you add an edit button later
  .edit-button {
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.sm};
    ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textLight};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.md};
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;
