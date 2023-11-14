import styled from "styled-components";

type Props = {
  children: string;
  paddingTop?: string | undefined;
  paddingSide?: string | undefined;
  Fontcolor?: string | undefined;
  background?: string | undefined;
  borderColor?: string | undefined;
  borderRadius?: string | undefined;
  onClick?: () => void;
};

const Button = ({
  children,
  paddingTop,
  paddingSide,
  Fontcolor,
  background,
  borderColor,
  borderRadius,
  onClick,
}: Props) => {
  return (
    <Btn
      $paddingTop={paddingTop}
      $paddingSide={paddingSide}
      $Fontcolor={Fontcolor}
      $background={background}
      $borderColor={borderColor}
      $borderRadius={borderRadius}
      onClick={onClick}
    >
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  paddingTop: "10",
  paddingSide: "10",
  background: "transparent",
  borderColor: "transparent",
  Fontcolor: "black",
};

export default Button;

export const Btn = styled.button<{
  $paddingTop?: string | undefined;
  $paddingSide?: string | undefined;
  $Fontcolor?: string | undefined;
  $background?: string | undefined;
  $borderColor?: string | undefined;
  $borderRadius?: string | undefined;
}>`
  border: 1px solid;
  background-color: ${(props) =>
    props.$background ? `${props.$background}` : "transparent"};
  border-color: ${(props) =>
    props.$borderColor ? `${props.$borderColor}` : "transparents"};
  border-radius: ${(props) =>
    props.$borderRadius ? `${props.$borderRadius}px` : "0px"};

  color: ${(props) => (props.$Fontcolor ? props.$Fontcolor : "black")};
  ${(props) =>
    props.$paddingTop && props.$paddingSide
      ? `padding: ${props.$paddingTop}px ${props.$paddingSide}px ;`
      : ""}
`;
