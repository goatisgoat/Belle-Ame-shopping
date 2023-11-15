import styled from "styled-components";
import { desktopCarousel, mobileCarousel } from "../../utility/imgConst";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
      <DesktopContainer>
        <Slider {...settings}>
          {desktopCarousel.map((content, i) => (
            <img
              key={i}
              src={content.image}
              alt={`Slide ${content}`}
              style={{ width: "100%", objectFit: "cover" }}
            />
          ))}
        </Slider>
      </DesktopContainer>
      <MobileContainer>
        <Slider {...settings}>
          {mobileCarousel.map((content, i) => (
            <img
              key={i}
              src={content.image}
              alt={`Slide ${content}`}
              style={{ width: "100%", objectFit: "cover" }}
            />
          ))}
        </Slider>
      </MobileContainer>
    </>
  );
};

export default Banner;

export const DesktopContainer = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  display: none;
  overflow: hidden;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
