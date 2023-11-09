import styled from "styled-components";

type Props = {
  bold: boolean | string;
  color: string;
  size: string;
  children: string | string[];
  margin: string | boolean;
};

const Text = ({ bold, color, size, children, margin }: Props) => {
  return (
    <Span $bold={bold} $color={color} $size={size} $margin={margin}>
      {children}
    </Span>
  );
};

export default Text;

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "13px",
  margin: false,
};

export const Span = styled.span<{
  $bold: string | boolean;
  $color: string;
  $size: string;
  $margin: string | boolean;
}>`
  display: flex;
  align-items: center;
  color: ${(props) => props.$color};
  font-size: ${(props) => `${props.$size}px`};
  font-weight: ${(props) => (props.$bold ? `${props.$bold}` : "400")};
  ${(props) => (props.$margin ? `margin: ${props.$margin};` : "")}
`;
