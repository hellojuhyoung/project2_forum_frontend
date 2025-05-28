import { useRouter } from "next/router";
import { DetailFeedStyled } from "./styled";
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
}

interface DetailFeedProps {
  post: Post;
  currentUsername: string | undefined;
}

const DetailFeed: React.FC<DetailFeedProps> = ({ post, currentUsername }) => {
  const router = useRouter();
  const isAuthor = currentUsername === post.user.username;
  const auth = useSelector((s: RootState) => s.authentication);
  const userid = auth.id;

  const isLoggedIn = !!userid;

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const heartClass = likeCount > 0 ? "liked" : "not-liked";
  const heartIcon = likeCount > 0 ? "❤️" : "🤍";

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

        console.log("this is frontend countData", countData);
        console.log("this is frontend checkData", checkData);
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
    } catch (err: any) {
      // console.error("Error toggling like", err.message);
      console.error("Failed to load likes", err?.response?.data || err.message);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/posts/edit?postid=${post.id}`);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await instance.delete(`/posts/${post.id}`);
      alert("Post deleted successfully");
      router.push("/");
    } catch (error) {
      alert("Failed to delete post");
      console.error(error);
    }
  };

  // Destructure images for clarity
  const images = post.images || [];

  // Hero image is the first one (if exists)
  const heroImage = images.length > 0 ? images[0] : null;

  // Gallery images are all after the first one
  const galleryImages = images.length > 1 ? images.slice(1) : [];

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

      {/* Hero Image */}
      {heroImage && (
        <div className="detail-main-image">
          <img
            src={`${API_URL}${heroImage.postImage}`}
            alt={`Main image for ${post.title}`}
            className="main-img"
          />
        </div>
      )}

      <div className="detail-content">{post.content}</div>

      {/* Gallery Images */}
      {galleryImages.length > 0 && (
        <div className="detail-gallery">
          {galleryImages.map((imgObj, index) => (
            <img
              key={index}
              src={`${API_URL}${imgObj.postImage}`}
              alt={`Gallery image ${index + 1} for ${post.title}`}
              className="gallery-img"
            />
          ))}
        </div>
      )}

      <div className="like-section">
        <button
          className={heartClass}
          disabled={!isLoggedIn}
          onClick={isLoggedIn ? toggleLike : undefined}
          title={isLoggedIn ? (isLiked ? "Unlike" : "Like") : "Login to like"}
        >
          {heartIcon} {likeCount}
        </button>
      </div>

      {isAuthor && (
        <div className="action-buttons">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </DetailFeedStyled>
  );
};

export default DetailFeed;
