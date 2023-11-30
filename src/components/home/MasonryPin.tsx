import { useState } from "react";
import styled from "styled-components";

const MasonryPin = (props: { img: string; num: number }) => {
  const [size, setSize] = useState(0);

  return (
    <PinDiv
      style={{
        margin: 15,
        padding: 0,
        borderRadius: 16,
        backgroundColor: "palegoldenrod",
        overflow: "hidden",
        display: "inline-block",
        height: `${size}px`,
        gridRowEnd: `span ${size + 28}`,
      }}
    >
      <img
        src={props.img}
        className="img"
        onLoad={(e) => setSize(e.currentTarget.clientHeight)}
      />
    </PinDiv>
  );
};

export default MasonryPin;

export const PinDiv = styled.div`
  & > img {
    width: 100%;
    object-fit: cover;
  }
`;
