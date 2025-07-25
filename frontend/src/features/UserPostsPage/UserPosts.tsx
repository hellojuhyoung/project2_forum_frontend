// frontend/src/features/UserPostsPage/UserPosts.tsx
import { useRouter } from "next/router";
import { UserPostsStyled } from "./styled";
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";
import MainFeed from "@/components/MainFeed/MainFeed";
import clsx from "clsx";

const UserPostsPage = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [posts, setPosts] = useState([]);

  const userPaginatedPosts = async () => {
    try {
      const response: any = await instance.get(`/users/getPosts/${userid}`);
      const posts = response.postByUser;

      // console.log(response);
      setPosts(posts);
    } catch (error) {
      console.error("error in getting user posts", error);
    }
  };

  useEffect(() => {
    userPaginatedPosts();
  }, [userid]);

  return (
    <>
      <UserPostsStyled className={clsx("users-posts-container")}>
        <div className="user-posts">
          {posts.map((post: any, index: number) => {
            return <MainFeed key={index} post={post} />;
          })}
        </div>
      </UserPostsStyled>
    </>
  );
};

export default UserPostsPage;
