import styled from "styled-components";

type Props = {
  bold: number;
  color: string;
  size: number;
  children: string | string[];
  marginBottom: number;
  marginRight: number;
  onClick?: () => void;
};

const Text = ({
  bold,
  color,
  size,
  children,
  marginBottom,
  marginRight,
  onClick,
}: Props) => {
  return (
    <Span
      $bold={bold}
      $color={color}
      $size={size}
      $marginBottom={marginBottom}
      $marginRight={marginRight}
      onClick={onClick}
    >
      {children}
    </Span>
  );
};

export default Text;

Text.defaultProps = {
  bold: 400,
  color: "#222831",
  size: "13px",
  marginBottom: 0,
  marginRight: 0,
};

export const Span = styled.p<{
  $bold: number;
  $color: string;
  $size: number;
  $marginBottom: number;
  $marginRight: number;
}>`
  color: ${(props) => props.$color};
  font-size: ${(props) => `${props.$size}px`};

  font-weight: ${(props) => (props.$bold ? `${props.$bold}` : "400")};

  margin-bottom: ${(props) => `${props.$marginBottom}px`};
  margin-right: ${(props) => `${props.$marginRight}px`};
`;
