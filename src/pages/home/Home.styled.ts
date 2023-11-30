import styled, { keyframes } from "styled-components";
import { colors } from "../../style/theme/colors";

const slide = keyframes`
    from{
      transform: translateX(0);
    }
    to{
      transform: translateX(-100%);
    }

`;

export const Container = styled.div`
  overflow-x: hidden;
`;

export const Section = styled.section`
  /* height: 100vh; */
  /* scroll-snap-align: start; */
`;

///
export const CategoryContainer = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  margin-bottom: 80px;
  padding: 20px;
  position: relative;

  @media only screen and (max-width: 700px) {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-right: 0;

    &::before {
      content: "";
      width: 50px;
      height: 60%;
      position: absolute;
      right: 0;
      top: 50px;
      bottom: 0;
      z-index: 1;
      background: linear-gradient(to right, rgba(225, 225, 225, 0), white);
    }
  }
`;

export const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > p:first-child {
    font-family: "Patrick Hand", "Noto Sans KR";
  }
  & > p:last-child {
    cursor: pointer;
  }

  @media only screen and (max-width: 700px) {
    & > p:last-child {
      padding-right: 20px;
    }
  }
`;

export const CategorysImgDiv = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
  align-items: center;
  position: relative;

  @media only screen and (max-width: 700px) {
    justify-content: start;
  }
`;

export const FLexColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  & > span {
    margin-top: 10px;
  }

  @media only screen and (max-width: 700px) {
    margin-right: 30px;
  }
`;

export const CategorysImg = styled.img`
  width: 60px;
  height: 60px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${colors.antiquewhite};
`;

///Slider
export const BestItemsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 150px;

  @media only screen and (max-width: 800px) {
    width: 140%;
  }

  @media only screen and (max-width: 550px) {
    width: 260%;
  }
`;

export const BestItemTitle = styled.div`
  padding-left: 20px;
  font-family: "Patrick Hand", "Noto Sans KR";
`;

export const BestItemDiv = styled.div`
  height: calc(100vh);
  max-height: 600px;
  padding: 10px;
  cursor: pointer;

  @media only screen and (max-width: 1200px) {
    max-height: 500px;
  }

  @media only screen and (max-width: 650px) {
    max-height: 400px;
  }
  @media only screen and (max-width: 550px) {
    max-height: 500px;
  }
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 90%;
  object-fit: cover;
  border-radius: 2%;
`;

export const ItemName = styled.div`
  height: 10%;
  padding-top: 5px;
  padding-left: 5px;
`;

// ------------------------

export const AutoInfinitSlide = styled.div`
  height: 600px;
  background-color: #1c1e1d;
  margin-bottom: 150px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  &:hover div {
    animation-play-state: paused;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;

export const InfinitImgDiv = styled.div`
  display: inline-block;
  animation: ${slide} 30s infinite linear;

  & > img {
    height: 600px;
    object-fit: cover;
  }
`;

// ------------------------

export const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 150px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 350px;
  gap: 10px;
  grid-template-areas:
    "a b b"
    "a c d";

  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "a b "
      "a c ";
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
export const GirdA = styled.div`
  grid-area: a;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;
export const GirdB = styled.div`
  grid-area: b;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;
export const GirdC = styled.div`
  grid-area: c;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`;

export const GirdD = styled.div`
  grid-area: d;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

/////
export const TodayDeal = styled.div`
  width: 100vw;
  height: 600px;
  margin-bottom: 150px;
  background-color: aquamarine;
`;

////
export const MasonlyContainer = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  justify-content: center;
  background-color: #bb6969;
`;
