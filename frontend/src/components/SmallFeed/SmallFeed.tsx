import { useRouter } from "next/router";
import { SmallFeedStyled } from "./styled";

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  contentImage?: string;
}

interface SmallFeedProps {
  post: Post;
}

const SmallFeed: React.FC<SmallFeedProps> = ({ post }) => {
  const router = useRouter();
  const direcToPost = async () => {
    router.push({
      pathname: "/posts/detail",
      query: { postid: post.id },
    });
  };

  return (
    <>
      <SmallFeedStyled onClick={direcToPost}>
        <div className="post-title">{post.title}</div>
        <div className="post-content">{post.content}</div>
        <div className="post-thumbnail">{post.thumbnail}</div>
        <div className="post-contentImage">{post.contentImage}</div>
      </SmallFeedStyled>
    </>
  );
};

export default SmallFeed;
