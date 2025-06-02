import { DetailPostStyled } from "./styled";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DetailFeed from "@/components/DetailFeed/DetailFeed";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

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
    user: { username: string };
    createdAt: string;
    category: { label: string };
    title: string;
    content: string;
    images: { postImage: string }[];
  } | null>(null);

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );
  const username = authentication.username;

  useEffect(() => {
    if (!router.isReady) return;

    async function getPost() {
      try {
        const response: any = await instance.get(`/posts/${postid}`);
        const post = response.post;

        // console.log("this is response post", post);
        setData(post);
      } catch (error) {
        console.error("error in getting a post", error);
      }
    }

    getPost();
  }, [router.isReady, postid]);

  // console.log("this is data before return", data, typeof data);

  return (
    <>
      <DetailPostStyled>
        <div>
          {data && <DetailFeed post={data} currentUsername={username} />}
        </div>
      </DetailPostStyled>
    </>
  );
};

export default DetailPostPage;
