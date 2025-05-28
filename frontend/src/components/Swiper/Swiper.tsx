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
            <MainFeed post={slide} isMostRecentSection />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </>
  );
};

export default SlideFeed;
