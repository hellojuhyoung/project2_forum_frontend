import {
  MainStyled,
  Container,
  MostRecentFeed,
  MainFeedGrid,
  PaginationStyled,
  Section,
  MostLikedFeed,
} from "./styled";

import clsx from "clsx";

// import skeleton structures from component
import MainFeed from "@/components/MainFeed/MainFeed";
import SlideFeed from "@/components/Swiper/Swiper";

// axios request api url localhost:5001
import { instance } from "@/utils/apis/axios";

// react and next built-in functions
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// import redux related built-in functions
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation("home"); // Initialize useTranslation
  const router = useRouter();

  // username and token saved on store redux
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  const id = authentication.id;
  const token = authentication.token;

  // console.log(id, token);

  // this is to retrieve most recent posts and display
  const [recentPost, setRecentPost] = useState([]);
  const [likedPost, setLikedPost] = useState([]);

  // this is to retrieve all the posts and display them on the main feed
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!router.isReady) return;

    // most recently created posts ordered by date total of 8 posts
    const getRecentPosts = async () => {
      try {
        const response: any = await instance.get("/posts/recent");
        const mostRecent_posts = response.posts;
        console.log("most recent posts", response);
        // console.log(mostRecent_posts);
        setRecentPost(mostRecent_posts);
      } catch (error) {
        console.error("error in getting recent posts", error);
      }
    };

    // most liked posts by the like counts total of 8 posts
    const getLikedPosts = async () => {
      try {
        const response: any = await instance.get("/posts/mostLiked");
        const mostLiked_posts = response.posts;
        console.log("mostliked response", response);
        setLikedPost(mostLiked_posts);
      } catch (error) {
        console.error("error fetching most liked posts", error);
      }
    };

    // all the posts by the style of pagination
    const getPaginatedPosts = async () => {
      try {
        const response: any = await instance.get(`/posts?page=${currentPage}`);
        // console.log(response);
        setPosts(response.posts);
        setTotalPages(response.totalPages);
        // console.log(response);
        // console.log(posts, typeof posts);
      } catch (error) {
        console.error("error in getting all the posts", error);
      }
    };

    getRecentPosts();
    getLikedPosts();
    getPaginatedPosts();
  }, [router.isReady, token, currentPage]);

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <span
          key={i}
          className={`page-number${i === currentPage ? " active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return pages;
  };

  return (
    <>
      <MainStyled className={clsx("main-container")}>
        <Container>
          {token ? <></> : <></>}

          <Section>
            <h2>{t("section_most_recent")}</h2>
            <MostRecentFeed>
              <SlideFeed slides={recentPost} />
            </MostRecentFeed>
          </Section>

          <Section>
            <h2>{t("section_most_liked")}</h2>
            <MostLikedFeed>
              <SlideFeed slides={likedPost} />
            </MostLikedFeed>
          </Section>

          <Section>
            <h2>{t("section_main_feed")}</h2>
            <MainFeedGrid>
              {
                posts && Array.isArray(posts) && posts.length > 0
                  ? posts.map((post: any, index: number) => (
                      <MainFeed key={index} post={post} />
                    ))
                  : null // Render nothing if no posts in main feed
              }
            </MainFeedGrid>
          </Section>

          <PaginationStyled>
            <button
              className="arrow"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {renderPageNumbers()}

            <button
              className="arrow"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </PaginationStyled>
        </Container>
      </MainStyled>
    </>
  );
}
