import { styled } from "styled-components";
import { Swiper } from "swiper/react";

// make sure you are not passing on the div tag...
// div tag is not compatible with module in swiper
// so instead of styled.div``... and on
// rather have styled(Swiper)
export const SwiperStyled = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    color: black;
  }
`;
