// frontend/src/components/MainFeed/MainFeed.tsx

import { useRouter } from "next/router";
import { MainFeedStyled } from "./styled";
import { useEffect, useState } from "react";
import { instance } from "@/utils/apis/axios";
import { useTranslation } from "react-i18next";

// for the localhost url import from the .env file
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  id: number;
  title: string;
  thumbnail: string;
  user: { username: string };
  createdAt: string;
}

interface MainFeedProps {
  post: Post;
  isMostRecentSection?: boolean;
  isMostLikedSection?: boolean;
}

const MainFeed: React.FC<MainFeedProps> = ({
  post,
  isMostRecentSection,
  isMostLikedSection,
}) => {
  const { t } = useTranslation("mainfeed");
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const { data } = await instance.get(`/likes/count/${post.id}`);
        setLikeCount(data.counts);
      } catch (err: any) {
        console.error(
          `Failed to load like count for post ${post.id}:`,
          err?.response?.data || err.message
        );
        setLikeCount(0); // Default to 0 on error
      }
    };
    fetchLikesCount();
  }, [post.id]); // Dependency array: re-fetch if post.id changes

  // Determine the heart icon based on the like count
  const heartIcon = likeCount > 0 ? "❤️" : "🤍";

  const directToPost = async () => {
    router.push({
      pathname: "/posts/detail",
      query: { postid: post.id },
    });
  };

  const formattedDate = new Date(post.createdAt)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");

  const thumbnailUrl = post.thumbnail
    ? post.thumbnail.startsWith("http://") ||
      post.thumbnail.startsWith("https://")
      ? post.thumbnail // If it's already an absolute URL, use it directly
      : `${API_URL}${post.thumbnail}` // Otherwise, prepend API_URL (for relative paths)
    : "/no-image.jpg"; // Fallback if no thumbnail

  console.log(`[MainFeed Debug] Post ID: ${post.id}`);
  console.log(`[MainFeed Debug] post.thumbnail received:`, post.thumbnail);
  console.log(`[MainFeed Debug] Calculated API_URL:`, API_URL);
  console.log(`[MainFeed Debug] Final thumbnailUrl:`, thumbnailUrl);

  return (
    <>
      <MainFeedStyled
        onClick={directToPost}
        $isMostRecentSection={isMostRecentSection}
        $isMostLikedSection={isMostLikedSection}
      >
        <div className="main-thumbnail">
          <div className="main-thumbnail-inner">
            <img
              src={thumbnailUrl}
              alt={
                post.thumbnail
                  ? t("thumbnail_alt_text", { title: post.title })
                  : t("no_image_available_alt_text")
              }
              className="thumbnail-img"
            />
          </div>
        </div>
        <div className="main-title">{post.title}</div>

        <div className="main-citation-and-likes">
          {/* citation includes username and createdAt */}
          <div className="main-citation">
            {formattedDate} | {t("citation_by_prefix")} {post.user.username}
          </div>

          <div className="like-display-section">
            {" "}
            {/* Use a new class name for styling */}
            <span className="heart-icon">{heartIcon}</span>
            <span className="like-count">{likeCount}</span>
          </div>
        </div>
      </MainFeedStyled>
    </>
  );
};

export default MainFeed;
