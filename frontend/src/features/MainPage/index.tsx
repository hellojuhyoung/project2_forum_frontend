import { MainStyled } from "./styled";

import clsx from "clsx";

// import skeleton structures from component
import SmallFeed from "@/components/SmallFeed/SmallFeed";
import SlideFeed from "@/components/Swiper/Swiper";

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

  // this is to retrieve most recent posts and display
  const [recentPost, setRecentPost] = useState([]);

  // this is to retrieve all the posts and display them on the main feed
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;

    const getRecentPosts = async () => {
      try {
        const response: any = await instance.get("/posts/recent");
        const mostRecent_posts = response.posts;
        // console.log(response)
        // console.log(mostRecent_posts);
        setRecentPost(mostRecent_posts);
      } catch (error) {
        console.error("error in getting recent posts", error);
      }
    };

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

    getRecentPosts();
    getPaginatedPosts();
  }, [router.isReady, token, currentPage]);

  return (
    <>
      <MainStyled className={clsx("main-container")}>
        {token ? <></> : <></>}

        <div className="most-recent-feed">
          <SlideFeed slides={recentPost} />
        </div>
        <div className="most-liked-feed"></div>

        <div className="main-feed">
          {posts.map((post: any, index: number) => {
            return <SmallFeed key={index} post={post} />;
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
