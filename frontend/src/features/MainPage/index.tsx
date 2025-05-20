import { MainStyled } from "./styled";

import clsx from "clsx";

// import skeleton structures from component
import SmallFeed from "@/components/SmallFeed/SmallFeed";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// react and next built-in functions
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import redux related built-in functions
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Main() {
  const router = useRouter();

  // username and token saved on store redux
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  const id = authentication.id;
  const token = authentication.token;

  console.log(id, token);

  // this is to retrieve all the posts and display them on the main feed
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;

    const getPaginatedPosts = async () => {
      try {
        const response: any = await instance.get(`/posts?page=${currentPage}`);
        setPosts(response.posts);
        setTotalPages(response.totalPages);
        // console.log(response);
        // console.log(posts, typeof posts);
      } catch (error) {
        console.error("error in getting all the posts", error);
      }
    };

    getPaginatedPosts();
  }, [router.isReady, token, currentPage]);

  return (
    <>
      <MainStyled className={clsx("main-container")}>
        {token ? <></> : <></>}

        <div className="main-feed">
          {posts.map((post: any, index: any) => {
            return (
              <div
                key={post.id}
                className="feed"
                onClick={() => {
                  router.push({
                    pathname: `/posts/detail`,
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
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </MainStyled>
    </>
  );
}
