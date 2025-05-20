import { SwiperStyled } from "./styled";
import SmallFeed from "../SmallFeed/SmallFeed";

// from swiper module
import { SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  contentImage?: string;
}

interface SlideFeedProps {
  slides: Post[];
}

const SlideFeed: React.FC<SlideFeedProps> = ({ slides }) => {
  const swiper = useSwiper();

  return (
    <>
      <SwiperStyled
        onClick={() => swiper.slideNext()}
        modules={[Navigation]}
        navigation={true} // Enable navigation
        spaceBetween={30}
        slidesPerView={4}
        loop={false}
        slidesPerGroup={4}
      >
        {slides.map((slide: Post, index: number) => (
          <SwiperSlide key={index}>
            <SmallFeed post={slide} />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </>
  );
};

export default SlideFeed;
