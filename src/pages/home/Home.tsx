import * as S from "./Home.styled";
import { useNavigate } from "react-router-dom";
import Text from "../../components/common/Text";
import Navbar from "../../components/common/Navbar";
import Banner from "../../components/home/Banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  SeparateLineImg,
  autoInfinitSlideObj,
  girdA,
  girdB,
  girdC,
  girdD,
  homeCategory,
} from "../../utility/imgConst";
import { colors } from "../../style/theme/colors";
import MasonryPin from "../../components/home/MasonryPin";
import ParticleBg from "../../components/home/ParticleBg";
import { useEffect, useState } from "react";
import { Product } from "../../models/product.type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/config/ConfigStore";
import { getProductHome } from "../../api/getProductHome";
import styled from "styled-components";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const Home = () => {
  const [sliceProduct, setSliceProduct] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleCategory = (name: string) => {
    navigate(`/search?category=${name}`);
  };

  useEffect(() => {
    dispatch(
      getProductHome({
        page: 1,
        setSliceProduct,
      })
    );
  }, []);

  const handleDetail = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <S.Container>
      <S.Section>
        <Navbar />
        <Banner />
      </S.Section>

      <S.CategoryContainer>
        <S.CategoryTitle>
          <Text size={20}>Category</Text>
          <Text
            size={13}
            color={colors.basicWithBrown}
            onClick={() => navigate("/search")}
          >
            See All
          </Text>
        </S.CategoryTitle>
        <S.CategorysImgDiv>
          {homeCategory.map((c, i) => {
            return (
              <S.FLexColumn key={i} onClick={() => handleCategory(c.name)}>
                <S.CategorysImg src={c.url} />
                <span>{c.label}</span>
              </S.FLexColumn>
            );
          })}
        </S.CategorysImgDiv>
      </S.CategoryContainer>

      <S.BestItemsContainer>
        <S.BestItemTitle>
          <Text size={20}>New Items</Text>
        </S.BestItemTitle>

        <Slider {...settings}>
          {sliceProduct.map((product, i) => (
            <S.BestItemDiv key={i} onClick={() => handleDetail(product._id)}>
              <S.ItemImg
                src={product.image}
                alt={`Slide ${product.name}`}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <S.ItemName>
                <Text size={14} bold={500}>
                  {product.name}
                </Text>
              </S.ItemName>
            </S.BestItemDiv>
          ))}
        </Slider>
      </S.BestItemsContainer>

      <S.SeparateLine>
        <S.SeparateLineDiv>
          <div>
            <Text size={12} color={colors.gray_900} marginBottom={5}>
              #레츠고
            </Text>
            <Text size={15} bold={600} color={colors.white}>
              첫 구매 시 10% 할인!
            </Text>
          </div>
          <S.SeparateLineImgDiv>
            <img src={SeparateLineImg} />
          </S.SeparateLineImgDiv>
        </S.SeparateLineDiv>
      </S.SeparateLine>

      <S.GridContainer>
        <S.GirdA>
          <img src={girdA} />
        </S.GirdA>
        <S.GirdB>
          <img src={girdB} />
        </S.GirdB>
        <S.GirdC>
          <img src={girdC} />
        </S.GirdC>
        <S.GirdD>
          <img src={girdD} />
        </S.GirdD>
      </S.GridContainer>

      <S.AutoInfinitSlide>
        <S.InfinitImgDiv>
          {autoInfinitSlideObj.map((slide, i) => {
            return <img src={slide.img} alt={slide.description} key={i} />;
          })}
        </S.InfinitImgDiv>
        <S.InfinitImgDiv>
          {autoInfinitSlideObj.map((slide, i) => {
            return <img src={slide.img} alt={slide.description} key={i} />;
          })}
        </S.InfinitImgDiv>
        <ParticleBg />
      </S.AutoInfinitSlide>

      {/* <Section>
        <TodayDeal>오늘만 특가!</TodayDeal>
      </Section>
      <Section>
        <div>기획전</div>
        <MasonlyContainer>
          <MasonryPin
            img="http://thumbnail.10x10.co.kr/webimage/image/basic600/117/B001178135.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false"
            num={1}
          />
          <MasonryPin
            img="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/23/06/01/GM0023060163787_0_THNAIL_ORGINL_20230608142046109.jpg"
            num={1}
          />
          <MasonryPin
            img="http://thumbnail.10x10.co.kr/webimage/image/basic600/117/B001178135.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false"
            num={1}
          />
          <MasonryPin
            img="http://thumbnail.10x10.co.kr/webimage/image/basic600/117/B001178135.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false"
            num={1}
          />
          <MasonryPin
            img="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/WMBR/23/06/01/GM0023060163787_0_THNAIL_ORGINL_20230608142046109.jpg"
            num={1}
          />
          <MasonryPin
            img="http://thumbnail.10x10.co.kr/webimage/image/basic600/117/B001178135.jpg?cmd=thumb&w=500&h=500&fit=true&ws=false"
            num={1}
          />
        </MasonlyContainer>
      </Section> */}
    </S.Container>
  );
};

export default Home;
