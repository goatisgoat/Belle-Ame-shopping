import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./Home.styled";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductHome } from "../../api/getProductHome";
import { deleteProductListMain } from "../../redux/modules/productSlice";
import Text from "../../components/common/Text";
import { Product } from "../../models/product.type";
import { stepFourCarousel } from "../../utility/imgConst";
import Navbar from "../../components/common/Navbar";
import Carousel from "react-material-ui-carousel";
import { useMediaQuery } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.product);

  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    name: query.get("name") || "",
  });

  const [productsList, setProductsList] = useState<Product[] | []>([]);
  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const isMobile = useMediaQuery("(max-width: 600px)");

  const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "" && !searchQuery?.name) {
        return;
      }

      if (e.currentTarget.value === searchQuery?.name) {
        return;
      }
      return setSearchQuery({
        ...searchQuery,
        name: e.currentTarget.value,
      });
    }
  };

  useEffect(() => {
    if (searchQuery?.name === "") {
      delete searchQuery.name;
    }

    setProductsList([]);
    setTotalPageNum(null);
    setPage(1);
    observer.current = null;
    setHasNextPage(true);

    const params = new URLSearchParams(searchQuery).toString();
    navigate(`?${params}`);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      getProductHome({
        ...searchQuery,
        page: "1",
        setProductsList,
        setTotalPageNum,
      })
    );
    setPage((pre) => pre + 1);
  }, [query]);

  const fetchNextPage = () => {
    if (totalPageNum === page - 1) {
      return setHasNextPage(false);
    }
    dispatch(
      getProductHome({
        ...searchQuery,
        page: page.toString(),
        setProductsList,
        setTotalPageNum,
      })
    );
    setPage(page + 1);
  };

  const LastelementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return null;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries, _) => {
        if (entries[0].isIntersecting) {
          if (isLoading && totalPageNum === null) return null;
          hasNextPage && fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, totalPageNum]
  );

  const handelDetail = (id: string) => {
    dispatch(deleteProductListMain());
    navigate(`/${id}`);
  };

  return (
    <S.MainContainer>
      <Navbar />
      <S.Banner>
        <Carousel
          cycleNavigation={true}
          navButtonsAlwaysVisible={true}
          duration={1500}
          interval={9000}
          indicators={false}
        >
          {stepFourCarousel.map((content, i) => (
            <S.BannerImg
              key={i}
              src={isMobile ? content.mobileImage : content.pcImage}
              alt={`Slide ${content}`}
              loading="lazy"
            />
          ))}
        </Carousel>
      </S.Banner>
      <S.SearchDiv>
        <div>
          <S.Search>
            <input
              type="search"
              placeholder="Search"
              onKeyDown={onCheckEnter}
              onChange={(e) => setKeyWord(e.target.value)}
              value={keyWord}
            />
          </S.Search>
        </div>
      </S.SearchDiv>
      <S.Items>
        {productsList.map((p, i) =>
          productsList.length - 1 !== i ? (
            <S.Item key={i} onClick={() => handelDetail(p._id)}>
              <img src={p.image} loading="lazy" />
              <S.NamePrice>
                <Text size="18" bold={"700"}>
                  {p.name}
                </Text>
                <Text size="13">₩ {String(p.price.toLocaleString())}</Text>
              </S.NamePrice>
            </S.Item>
          ) : (
            <S.Item
              key={i}
              ref={LastelementRef}
              onClick={() => handelDetail(p._id)}
            >
              <img src={p.image} />
              <S.NamePrice>
                <Text bold={"700"}>{p.name}</Text>
                <Text size="13">₩ {String(p.price.toLocaleString())}</Text>
              </S.NamePrice>
            </S.Item>
          )
        )}
      </S.Items>
    </S.MainContainer>
  );
};

export default Home;
