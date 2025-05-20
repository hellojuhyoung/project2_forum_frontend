import clsx from "clsx";
import { UserPostDetailStyled } from "./styled";
import { useRouter } from "next/router";
import { instance } from "@/utils/apis/axios";
import { useEffect, useState } from "react";

const UserPostDetailPage = () => {
  const router = useRouter();
  const { postid } = router.query;
  const [data, setData] = useState<{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    contentImage: string;
    userid: number;
    categoryid: number;
  } | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    async function getPost() {
      try {
        const response: any = await instance.get(`/posts/${postid}`);
        const post = response.post;

        console.log("this is response post", post);
        setData(post);
      } catch (error) {
        console.error("error in getting a post", error);
      }
    }

    getPost();
  }, [router.isReady, postid]);

  const editPost = () => {
    router.push({
      pathname: `/posts/edit`,
      query: { postid: postid },
    });
    // router.push("/posts/edit");
  };

  return (
    <>
      <UserPostDetailStyled className={clsx("user-post-detail-container")}>
        <div>{data?.title}</div>
        <div>{data?.content}</div>
        <div>{data?.thumbnail}</div>
        <div>{data?.contentImage}</div>
        <div>
          <button onClick={editPost}>edit post</button>
        </div>
      </UserPostDetailStyled>
    </>
  );
};

export default UserPostDetailPage;
