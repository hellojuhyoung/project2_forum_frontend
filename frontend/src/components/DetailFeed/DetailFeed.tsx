// frontend/src/components/DetailFeed/DetailFeed.tsx

import { useRouter } from "next/router";
import { DetailFeedStyled, ImageLightboxStyled } from "./styled";
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { notification, Modal } from "antd";
import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to extract the first image URL from Markdown content
function extractImageUrlFromMarkdown(markdownContent: string): string | null {
  const imageRegex =
    /!\[.*?\]\((https?:\/\/[^\s)]+\.(?:jpg|jpeg|png|gif|webp|svg))\)/;
  const match = markdownContent.match(imageRegex);
  return match ? match[1] : null;
}

interface Post {
  id: number;
  user: { username: string };
  createdAt: string;
  category: { label: string };
  title: string;
  content: string;
  images: { postImage: string }[];
  thumbnail?: string; // Keep this in the interface; backend will provide it for listings.
}

interface DetailFeedProps {
  post: Post;
  currentUsername: string | null;
}

const DetailFeed: React.FC<DetailFeedProps> = ({ post, currentUsername }) => {
  const { t } = useTranslation("detailfeed");
  const router = useRouter();
  const isAuthor = currentUsername === post.user.username;
  const auth = useSelector((s: RootState) => s.authentication);
  const userid = auth.id;

  const isLoggedIn = !!userid;

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const heartClass = likeCount > 0 ? "liked" : "not-liked";
  const heartIcon = likeCount > 0 ? "❤️" : "🤍";

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageSrc, setLightboxImageSrc] = useState("");

  const date = new Date(post.createdAt);
  const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const params: Record<string, any> = { postid: post.id };
        if (userid) {
          params.userid = userid;
        }

        const [{ data: countData }, { data: checkData }] = await Promise.all([
          instance.get(`/likes/count/${post.id}`),
          instance.get(`/likes/check`, { params }),
        ]);

        setLikeCount(countData.counts);
        setIsLiked(checkData.liked);
      } catch (err: any) {
        console.error(
          "Failed to load likes",
          err?.response?.data || err.message
        );
      }
    };
    fetchLikes();
  }, [post.id, userid]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isLoggedIn) {
        if (isLiked) {
          await instance.delete(`/likes`, {
            data: { postid: post.id, userid: userid },
          });
          setLikeCount((c) => c - 1);
          setIsLiked(false);
        } else {
          await instance.post(`/likes`, {
            postid: post.id,
            userid: userid,
          });
          setLikeCount((c) => c + 1);
          setIsLiked(true);
        }
      } else {
        notification.info({
          message: t("like_login_required_title"),
          description: t("like_login_required_description"),
          placement: "topRight",
        });
      }
    } catch (err: any) {
      console.error("Error toggling like", err?.response?.data || err.message);
      notification.error({
        message: t("like_toggle_failed_title"),
        description: t("like_toggle_failed_description"),
        placement: "topRight",
      });
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/posts/edit?postid=${post.id}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Modal.confirm({
      title: t("confirm_delete_post_title"),
      content: t("confirm_delete_post_content"),
      okText: t("confirm_delete_post_ok_text"),
      cancelText: t("confirm_delete_post_cancel_text"),
      onOk: async () => {
        try {
          await instance.delete(`/posts/${post.id}`);
          notification.success({
            message: t("notification_success_title"),
            description: t("notification_post_deleted_description"),
            placement: "topRight",
          });
          router.push("/");
        } catch (error) {
          notification.error({
            message: t("notification_deletion_failed_title"),
            description: t("notification_deletion_failed_description"),
            placement: "topRight",
          });
          console.error(error);
        }
      },
      onCancel() {
        // User clicked cancel, do nothing
      },
    });
  };

  // --- START OF MAIN IMAGE & CONTENT LOGIC ---
  let mainImageSrcForDetail: string | null = null;
  let contentForMarkdown: string = post.content;

  // 1. Extract the first image URL from the content
  const firstImageUrlFromContent = extractImageUrlFromMarkdown(post.content);

  if (firstImageUrlFromContent) {
    // Determine the full URL for the main display image
    mainImageSrcForDetail =
      firstImageUrlFromContent.startsWith("http://") ||
      firstImageUrlFromContent.startsWith("https://")
        ? firstImageUrlFromContent // Already an absolute URL (e.g., from Velog)
        : `${API_URL}${firstImageUrlFromContent}`; // Prepend API_URL for local uploads

    // Remove this image's Markdown from the content to avoid duplication in ReactMarkdown
    const escapedUrl = firstImageUrlFromContent.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const imageMarkdownRegex = new RegExp(`!\\[.*?\\]\\(${escapedUrl}\\)`, "g");
    contentForMarkdown = post.content.replace(imageMarkdownRegex, "");
  }
  // Optional: If no image found in content, you might want a fallback default image here
  // else {
  //   mainImageSrcForDetail = "/path/to/default/no-image.jpg";
  // }
  // --- END OF MAIN IMAGE & CONTENT LOGIC ---

  // Adjust galleryImages logic: Filter out the image used for main display
  const galleryImages =
    post.images?.filter((img) => {
      const fullLocalPath = `${API_URL}${img.postImage}`;
      return fullLocalPath !== mainImageSrcForDetail;
    }) || [];

  const openLightbox = (imageSrc: string) => {
    setLightboxImageSrc(imageSrc);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImageSrc("");
  };

  return (
    <DetailFeedStyled>
      <div className="detail-title">{post.title}</div>

      <div className="detail-meta">
        <span className="detail-category">{post.category.label}</span>
        <div className="detail-user-date">
          <span className="detail-username">{post.user.username}</span>
          <span className="detail-createdAt">{formattedDate}</span>
        </div>
      </div>

      {/* Main Display Image (uses the first image from content) */}
      {mainImageSrcForDetail && (
        <div
          className="detail-main-image"
          onClick={() => openLightbox(mainImageSrcForDetail)}
        >
          <img
            src={mainImageSrcForDetail} // This is the full-quality image from content
            alt={t("image_alt_main_image", { title: post.title })}
            className="main-img"
          />
        </div>
      )}

      {/* !!! CRITICAL ACTION: MANUALLY REMOVE ANY OTHER STRAY <img> TAGS !!!
          Based on your HTML, there's a standalone <img> tag immediately after the
          "detail-main-image" div and before "detail-content".
          You MUST locate this line of JSX in your DetailFeed.tsx (or any parent component
          that renders post details) and DELETE IT. It's the source of the second pixelated image.
          It might look something like this:
          <img src={post.thumbnail ? `${API_URL}${post.thumbnail}` : '/no-image.jpg'} alt="..." />
      */}

      {/* Post Content (Markdown, with the first image REMOVED) */}
      <div className="detail-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contentForMarkdown}
        </ReactMarkdown>
      </div>

      {/* Gallery Images (all other locally uploaded images) */}
      {galleryImages.length > 0 && (
        <div className="detail-gallery">
          {galleryImages.map((imgObj, index) => {
            const galleryImgSrc =
              imgObj.postImage.startsWith("http://") ||
              imgObj.postImage.startsWith("https://")
                ? imgObj.postImage
                : `${API_URL}${imgObj.postImage}`;

            return (
              <img
                key={index}
                src={galleryImgSrc}
                alt={t("image_alt_gallery_image", {
                  index: index + 1,
                  title: post.title,
                })}
                className="gallery-img"
                onClick={() => openLightbox(galleryImgSrc)}
              />
            );
          })}
        </div>
      )}

      {/* Like Section */}
      <div className="like-section">
        <button
          onClick={toggleLike}
          className={heartClass}
          disabled={!isLoggedIn}
        >
          <span className="heart-icon">{heartIcon}</span>
          <span className="like-count">{likeCount}</span>
        </button>
      </div>

      {isAuthor && (
        <div className="action-buttons">
          <button onClick={handleEdit} className="edit-btn">
            {t("button_edit")}
          </button>
          <button onClick={handleDelete} className="delete-btn">
            {t("button_delete")}
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <ImageLightboxStyled onClick={closeLightbox}>
          <img src={lightboxImageSrc} alt="Lightbox image" />
        </ImageLightboxStyled>
      )}
    </DetailFeedStyled>
  );
};

export default DetailFeed;
