import { useRouter } from "next/router";
import { UserPostsStyled } from "./styled";
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";

const UserPostsPage = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [posts, setPosts] = useState([]);

  const userPosts = async () => {
    try {
      const response: any = await instance.get(`/users/getPosts/${userid}`);
      const posts = response.postByUser;
      setPosts(posts);
    } catch (error) {
      console.error("error in getting user posts", error);
    }
  };

  useEffect(() => {
    userPosts();
  }, [posts]);

  return (
    <>
      <UserPostsStyled>
        <div className="user-posts">
          {posts.map((post: any, index: any) => {
            return (
              <div
                key={post.id}
                className="user-post"
                onClick={() => {
                  router.push({
                    pathname: `/posts/user/detail`,
                    query: { postid: post.id },
                  });
                }}
              >
                <div>{post.title}</div>
                <div>{post.content}</div>
                <div>{post.thumbnail}</div>
                <div>{post.contentImage}</div>
              </div>
            );
          })}
        </div>
      </UserPostsStyled>
    </>
  );
};

export default UserPostsPage;
