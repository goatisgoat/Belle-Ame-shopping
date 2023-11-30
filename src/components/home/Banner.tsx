import styled, { keyframes } from "styled-components";
import { banner1, bannerMobile1 } from "../../utility/imgConst";
import Text from "../common/Text";
import { colors } from "../../style/theme/colors";

const Banner = () => {
  return (
    <>
      <DesktopContainer>
        <BannerImg alt="cloud" src={banner1} style={{ width: "100%" }} />
        <BannerTitle>
          <TitleLine>
            <Text size={30} bold={700} color={colors.white}>
              블프데이
            </Text>
            <Text size={30} bold={700} color={colors.white}>
              초특급 할인!
            </Text>
            <Text size={13} bold={300} color={colors.white}>
              UP TO 50% OFF
            </Text>
          </TitleLine>
        </BannerTitle>
      </DesktopContainer>
      <MobileContainer>
        <img src={bannerMobile1} alt="banner" />
      </MobileContainer>
    </>
  );
};

export default Banner;

const move = keyframes`
    from{
      transform: translateX(-30px);
    }
    to{
      transform: translateX(0);
    }

`;

export const DesktopContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const BannerImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const BannerTitle = styled.div`
  width: 48.3%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Patrick Hand", "Noto Sans KR";
  white-space: nowrap;
`;

export const TitleLine = styled.div`
  width: 50%;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  transition: all 0.5s ease-in-out;
  animation: ${move} 0.5s ease-in-out;

  @media only screen and (max-width: 1600px) {
    padding: 40px;
  }

  @media only screen and (max-width: 900px) {
    padding: 20px;
    border-top: 1px solid white;
    border-bottom: 1px solid white;

    & > p {
      font-size: 20px;
    }
    & > p:last-child {
      font-size: 13px;
    }
  }
`;

export const MobileContainer = styled.div`
  display: none;
  overflow: hidden;
  margin: 10px;
  margin-top: 80px;
  & > img {
    width: 100%;
    object-fit: cover;
  }
  @media only screen and (max-width: 700px) {
    display: block;
  }
`;
