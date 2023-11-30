import { useEffect, useRef } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Text from "../components/common/Text";
import { colors } from "../style/theme/colors";
import * as S from "../pages/admin/AdminProduct.styled";
import Button from "../components/common/Button";

type Props = {
  handleImg: (url: string) => void;
  imgError: boolean;
};

const UploadWidget = ({ handleImg, imgError }: Props) => {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`,
        uploadPreset: `${process.env.REACT_APP_CLOUDINARY_PRESET}`,
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          handleImg(result.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <>
      <Text
        size={15}
        color={imgError ? "#f86c6c" : colors.gray_300}
        marginRight={10}
      >
        Img
      </Text>
      <Button
        Fontcolor={colors.basicWithBrown}
        background={colors.antiquewhite}
        borderRadius="20"
        paddingTop="10"
        paddingSide="15"
        onClick={() => widgetRef.current?.open()}
      >
        Upload
      </Button>
    </>
  );
};

export default UploadWidget;
