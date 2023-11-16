import { useEffect } from "react";
import api from "../../utility/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/config/ConfigStore";
import { loginWithKakao } from "../../api/loginWithkakao";

const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) dispatch(loginWithKakao({ code, navigate }));
  }, []);

  return <div>kakao</div>;
};

export default Kakao;
