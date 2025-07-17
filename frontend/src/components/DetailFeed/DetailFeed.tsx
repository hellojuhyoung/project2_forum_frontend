// frontend/src/components/DetailFeed/DetailFeed.tsx

import { useRouter } from "next/router";
import { DetailFeedStyled, ImageLightboxStyled } from "./styled"; // Import ImageLightboxStyled
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { notification, Modal } from "antd"; // Import Modal from antd
import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// for the localhost url import from the .env file
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  id: number;
  user: { username: string };
  createdAt: string;
  category: { label: string };
  title: string;
  content: string;
  images: { postImage: string }[];
  thumbnail?: string; // MODIFIED: Made thumbnail property optional
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
  const heartClass = likeCount > 0 ? "liked" : "not-liked"; // Reverted to original logic
  const heartIcon = likeCount > 0 ? "❤️" : "🤍"; // Reverted to original logic

  // NEW STATE: For image lightbox
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

        // Access data using destructuring from response objects as per your original code
        const [{ data: countData }, { data: checkData }] = await Promise.all([
          instance.get(`/likes/count/${post.id}`),
          instance.get(`/likes/check`, { params }),
        ]);

        // console.log("this is frontend countData", countData);
        // console.log("this is frontend checkData", checkData);
        setLikeCount(countData.counts);
        setIsLiked(checkData.liked);
      } catch (err: any) {
        console.log(err);
        // console.error("Failed to load likes", err.message);
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
        // Only allow if logged in
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

  // UPDATED: Use Ant Design Modal.confirm instead of browser confirm()
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Modal.confirm({
      title: t("confirm_delete_post_title"), // Use translation for title
      content: t("confirm_delete_post_content"), // Use translation for content
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

  // Determine the main image (thumbnail takes precedence, otherwise first image from images array)
  // This logic correctly handles if thumbnail is undefined or null
  const mainDisplayImage = post.thumbnail
    ? post.thumbnail
    : post.images && post.images.length > 0
    ? post.images[0].postImage
    : null;

  const displayImageSrc = mainDisplayImage
    ? mainDisplayImage.startsWith("http://") ||
      mainDisplayImage.startsWith("https://")
      ? mainDisplayImage // If it's already an absolute URL, use it directly
      : `${API_URL}${mainDisplayImage}` // Otherwise, prepend API_URL (for relative paths)
    : "/no-image.jpg"; // Fallback if no main display image

  let contentForMarkdown = post.content;
  if (mainDisplayImage) {
    // Regex to find Markdown image syntax for the specific mainDisplayImage URL
    // This is crucial: we want to remove the Markdown of *that specific image*
    // Escape special characters in the URL for regex safety
    const escapedMainImageUrl = mainDisplayImage.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );
    const imageMarkdownRegex = new RegExp(
      `!\\[.*?\\]\\(${escapedMainImageUrl}\\)`,
      "g"
    );

    // Remove the markdown syntax for the main image from the content
    contentForMarkdown = post.content.replace(imageMarkdownRegex, "");
  }

  // Filter out the main image from the gallery images
  const galleryImages =
    post.images?.filter((img) => img.postImage !== mainDisplayImage) || [];

  // NEW: Function to open the lightbox
  const openLightbox = (imageSrc: string) => {
    setLightboxImageSrc(imageSrc);
    setIsLightboxOpen(true);
  };

  // NEW: Function to close the lightbox
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

      {/* Main Display Image (Thumbnail or first image) */}
      {mainDisplayImage && (
        <div
          className="detail-main-image"
          onClick={() => openLightbox(`${API_URL}${mainDisplayImage}`)}
        >
          <img
            // --- UPDATE src to use displayImageSrc ---
            src={displayImageSrc}
            alt={t("image_alt_main_image", { title: post.title })}
            className="main-img"
          />
        </div>
      )}

      {/* Post Content (plain text) */}
      <div className="detail-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contentForMarkdown}
        </ReactMarkdown>
      </div>

      {/* Gallery Images (all images excluding the one used as mainDisplayImage) */}
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

      <div className="like-section">
        <button
          className={heartClass}
          disabled={!isLoggedIn}
          onClick={isLoggedIn ? toggleLike : undefined}
          title={
            isLoggedIn
              ? isLiked
                ? t("button_unlike_title")
                : t("button_like_title")
              : t("button_login_to_like_title")
          }
        >
          {heartIcon} {likeCount}
        </button>
      </div>

      {isAuthor && (
        <div className="action-buttons">
          <button className="edit-btn" onClick={handleEdit}>
            {t("button_edit")}
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            {t("button_delete")}
          </button>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {isLightboxOpen && lightboxImageSrc && (
        <ImageLightboxStyled onClick={closeLightbox}>
          <img src={lightboxImageSrc} alt={t("image_alt_lightbox")} />
        </ImageLightboxStyled>
      )}
    </DetailFeedStyled>
  );
};

export default DetailFeed;
