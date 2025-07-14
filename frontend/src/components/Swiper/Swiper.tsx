import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { SwiperStyled } from "./styled";
import MainFeed from "../MainFeed/MainFeed";
import { theme } from "@/styles/theme";

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

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <>
      <SwiperStyled
        onSwiper={setSwiperInstance}
        // REMOVED: onClick={() => swiperInstance?.slideNext()} - This was causing unintended slide advances
        modules={[Navigation]}
        navigation={true}
        spaceBetween={theme.spacing.md} // Use theme spacing for consistency
        loop={false}
        // slidesPerGroup is now handled by breakpoints for responsive grouping
        // slidesPerView is now handled by breakpoints for responsive viewing

        // NEW: Responsive Breakpoints for slidesPerView and spaceBetween
        breakpoints={{
          // When window width is >= 1400px (large desktops)
          1400: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: theme.spacing.lg, // More space on larger screens
          },
          // When window width is >= 992px (medium desktops/laptops)
          992: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: theme.spacing.md,
          },
          // When window width is >= 768px (tablets)
          768: {
            slidesPerView: 2.5, // Show 2 full and a partial 3rd to indicate scroll
            slidesPerGroup: 2,
            spaceBetween: theme.spacing.md,
          },
          // When window width is >= 576px (larger phones)
          576: {
            slidesPerView: 1.8, // Show 1 full and a partial 2nd
            slidesPerGroup: 1,
            spaceBetween: theme.spacing.sm,
          },
          // When window width is < 576px (small phones)
          0: {
            // Default for smaller screens
            slidesPerView: 1.2, // Show 1 full and a partial 2nd
            slidesPerGroup: 1,
            spaceBetween: theme.spacing.sm,
          },
        }}
      >
        {slides.map((slide: Post, index: number) => (
          <SwiperSlide key={index}>
            {/* isMostRecentSection and isMostLikedSection props are for MainFeed styling */}
            <MainFeed post={slide} isMostRecentSection isMostLikedSection />
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </>
  );
};

export default SlideFeed;
