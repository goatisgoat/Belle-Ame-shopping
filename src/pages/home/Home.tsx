import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./Home.styled";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProductHome } from "../../api/getProductHome";
import { deleteProductListMain } from "../../redux/modules/productSlice";
import Text from "../../components/common/Text";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productsList, totalPageNum, isLoading } = useSelector(
    (state: RootState) => state.product
  );

  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    name: query.get("name") || "",
  });

  const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        return window.location.replace("/?type=main&page=1");
      }

      if (e.currentTarget.value !== searchQuery.name) {
        dispatch(deleteProductListMain());
        setPage(1);
        setSearchQuery({
          ...searchQuery,
          name: e.currentTarget.value,
        });
      }
    }
  };

  useEffect(() => {
    if (searchQuery?.name === "") {
      delete searchQuery.name;
    }

    const params = new URLSearchParams(searchQuery).toString();
    navigate(`?${params}`);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(deleteProductListMain());
    dispatch(getProductHome({ ...searchQuery, page: page.toString() }));
    setPage(page + 1);
  }, [query]);

  console.log(productsList);

  //
  const observer = useRef<IntersectionObserver | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchNextPage = () => {
    if (totalPageNum === page - 1) {
      return setHasNextPage(false);
    }
    dispatch(getProductHome({ ...searchQuery, page: page.toString() }));
    setPage(page + 1);
  };

  const LastelementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return null;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries, _) => {
        if (entries[0].isIntersecting) {
          if (isLoading) return null;
          hasNextPage && fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const handelDetail = (id: string) => {
    dispatch(deleteProductListMain());
    navigate(`/${id}`);
  };

  return (
    <>
      <S.Banner>
        <img
          src="https://user-images.githubusercontent.com/129598273/278545611-d21e4e33-d4c5-40c7-bbf4-c1be64bdfc7b.png"
          loading="lazy"
        />
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
    </>
  );
};

export default Home;
