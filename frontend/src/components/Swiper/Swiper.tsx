import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { SwiperStyled } from "./styled";
import MainFeed from "../MainFeed/MainFeed";

interface Post {
  id: number;
  title: string;
  thumbnail: string;
  user: { username: string };
  createdAt: string;
}

interface SlideFeedProps {
  slides: Post[];
}

const SlideFeed: React.FC<SlideFeedProps> = ({ slides }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // safety for all the swiper, very brief moment during component re-renders (perhaps due to router.isReady or other effects)
  // where slides temporarily becomes undefined or null before the useEffect fetches data, or before useState fully takes effect in a subsequent render cycle.
  // basically rendeirng issues associated with rehydration? possibly
  // redux rehydration

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    // Optionally, render a loading state, a message, or null
    // For now, we'll return null to prevent the crash.
    // console.log("SlideFeed: 'slides' is not a valid array or is empty.", slides);
    return null;
  }

  return (
    <>
      <SwiperStyled
        onSwiper={setSwiperInstance} // capture swiper instance here
        onClick={() => swiperInstance?.slideNext()} // safely call slideNext if instance exists
        modules={[Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={4}
        loop={false}
        slidesPerGroup={4}
      >
        {slides.map((slide: Post, index: number) => (
          <SwiperSlide key={index}>
            <MainFeed post={slide} isMostRecentSection isMostLikedSection />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </>
  );
};

export default SlideFeed;
