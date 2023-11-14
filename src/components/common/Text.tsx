import styled from "styled-components";

type Props = {
  bold: boolean | string;
  color: string;
  size: string;
  children: string | string[];
  marginBottom: string | boolean;
  marginRight: string | boolean;
};

const Text = ({
  bold,
  color,
  size,
  children,
  marginBottom,
  marginRight,
}: Props) => {
  return (
    <Span
      $bold={bold}
      $color={color}
      $size={size}
      $marginBottom={marginBottom}
      $marginRight={marginRight}
    >
      {children}
    </Span>
  );
};

export default Text;

Text.defaultProps = {
  bold: false,
  color: "#222831",
  size: "13px",
  marginBottom: false,
  marginRight: false,
};

export const Span = styled.span<{
  $bold: string | boolean;
  $color: string;
  $size: string;
  $marginBottom: string | boolean;
  $marginRight: string | boolean;
}>`
  display: flex;
  align-items: center;
  color: ${(props) => props.$color};
  font-size: ${(props) => `${props.$size}px`};
  font-weight: ${(props) => (props.$bold ? `${props.$bold}` : "400")};
  ${(props) =>
    props.$marginBottom ? `margin-bottom: ${props.$marginBottom};` : ""};
  ${(props) =>
    props.$marginRight ? `margin-right: ${props.$marginRight};` : ""};
`;
