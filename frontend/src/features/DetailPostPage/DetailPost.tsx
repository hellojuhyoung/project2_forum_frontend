import { useEffect, useState } from "react";
import { DetailPostStyled } from "./styled";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";
import { useRouter } from "next/router";
import Post from "../PostPage/Post";

// once you pass on props from the parent components
// must declare in the child function as props and would need to
// define the data type then pass on in the function
// then with the same data type that's been passed on
// destructure the variable... ex) const {id} = props;

const DetailPostPage = () => {
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

  console.log("this is data before return", data, typeof data);

  return (
    <>
      <div>
        {/* {data?.map((value: any, index: any) => (
          <div>
            <div key={index}>{value}</div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ))} */}
        <div>{data?.title}</div>
        <div>{data?.content}</div>
        <div>{data?.thumbnail}</div>
        <div>{data?.contentImage}</div>
      </div>
    </>
  );
};

export default DetailPostPage;
