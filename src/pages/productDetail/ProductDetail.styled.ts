import styled from "styled-components";
import { colors } from "../../style/theme/colors";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  padding-top: 70px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media only screen and (max-width: 780px) {
    padding-top: 0px;
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }
`;

export const ImgDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;

  & > div {
    width: 80%;
    height: 90%;
  }
  & > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  @media only screen and (max-width: 780px) {
    justify-content: center;
    height: 80vh;

    & > div {
      width: 100%;
      height: 100%;
    }
    & > div > img {
      border-radius: 0px;
    }
  }
`;

export const Info = styled.div<{ $upToOpen: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.7s;

  & > div {
    width: 80%;
    height: 80%;
  }

  @media only screen and (max-width: 780px) {
    background-color: white;
    position: fixed;
    border-radius: 15px;
    right: 0;
    left: 0;
    height: 90%;
    overflow-y: scroll;

    top: ${(props) => (props.$upToOpen === true ? `10%` : "75%")};

    & > div {
      width: 70%;
      height: 90%;
      padding-bottom: 100px;
    }
  }
`;

export const TitlePrice = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.adminMenuBorder};
  position: relative;
`;
export const MobileScrollEvent = styled.div`
  display: none;

  @media only screen and (max-width: 780px) {
    display: block;
    position: absolute;
    top: -30px;
    width: 100%;
    height: 150px;
    /* background-color: aqua; */
  }
`;

export const Name = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

export const Price = styled.div`
  margin-bottom: 30px;
`;

export const Description = styled.div`
  padding-bottom: 20px;
  margin-bottom: 50px;
  border-bottom: 1px solid ${colors.adminMenuBorder};
`;

export const Size = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  overflow-x: scroll;
`;

// export const SizeTitle = styled.div`

export const SizeBtn = styled.button<{
  $cartError: boolean;
  $isSelected: boolean;
  $isOutOfStock: boolean;
}>`
  width: 45px;
  height: 45px;
  font-size: 12px;
  margin-right: 20px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  transition: 0.1s;

  border-color: ${(props) =>
    props.$cartError === true ? colors.adminDelete : colors.inputBorder};

  background-color: ${(props) =>
    props.$isSelected === true ? colors.beige_900 : "transparent"};

  text-decoration: ${(props) =>
    props.$isOutOfStock === true ? "line-through" : ``};
`;

export const Qty = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  overflow-x: scroll;

  & > button {
    margin: 0 10px;
    flex-shrink: 0;
    font-size: 15px;
    color: ${colors.gray_900};
  }
`;

export const QtyNumDiv = styled.div`
  width: 45px;
  height: 35px;
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  color: ${colors.black};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Order = styled.div`
  width: 100%;
  border-radius: 3px;
  padding: 10px 10px;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid ${colors.gray_200};
`;
