import { useEffect, useRef } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styled from "styled-components";

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
      <Flex>
        <div>Img</div>
        {imgError ? (
          <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
        ) : null}
      </Flex>
      <button onClick={() => widgetRef.current?.open()}>button</button>
    </>
  );
};

export default UploadWidget;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  & > div {
    margin-right: 5px;
  }
`;
