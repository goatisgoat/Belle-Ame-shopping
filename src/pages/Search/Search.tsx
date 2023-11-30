import React, { useCallback, useEffect, useRef, useState } from "react";
import { deleteProductListMain } from "../../redux/modules/productSlice";
import { getProductSearch } from "../../api/getProductSearch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Product } from "../../models/product.type";
import Text from "../../components/common/Text";
import * as S from "./Search.styled";
import { homeCategory } from "../../utility/imgConst";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.product);

  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState(query.get("name") || "");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    name: query.get("name") || "",
    category: query.get("category") || "",
  });

  const [productsList, setProductsList] = useState<Product[] | []>([]);
  const [totalPageNum, setTotalPageNum] = useState<number | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

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

    if (searchQuery?.category === "") {
      delete searchQuery.category;
    }

    const params = new URLSearchParams(searchQuery).toString();
    navigate(`?${params}`);
  }, [searchQuery]);

  useEffect(() => {
    setProductsList([]);
    setTotalPageNum(null);
    observer.current = null;
    setHasNextPage(true);

    const currentUrlQuery: { [key: string]: string } = {
      name: query.get("name") || "",
      category: query.get("category") || "",
    };

    setKeyWord(currentUrlQuery.name);

    if (!currentUrlQuery.name) delete currentUrlQuery.name;
    if (!currentUrlQuery.category) delete currentUrlQuery.category;

    dispatch(
      getProductSearch({
        ...currentUrlQuery,
        page: "1",
        setProductsList,
        setTotalPageNum,
      })
    );

    setPage(2);
  }, [query]);

  const fetchNextPage = () => {
    const currentUrlQuery: { [key: string]: string } = {
      name: query.get("name") || "",
      category: query.get("category") || "",
    };

    if (totalPageNum === page - 1) {
      return setHasNextPage(false);
    }
    dispatch(
      getProductSearch({
        ...currentUrlQuery,
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

  const handleCategory = (name: string) => {
    return setSearchQuery({
      ...searchQuery,
      category: name,
    });
  };

  return (
    <S.Container>
      <S.SearchContainer>
        <input
          type="search"
          placeholder={"Search"}
          onKeyDown={onCheckEnter}
          onChange={(e) => setKeyWord(e.target.value)}
          value={keyWord}
        />
      </S.SearchContainer>

      <S.CategorysImgDiv>
        <S.FLexColumn onClick={() => handleCategory("")}>
          <S.CategorysImg
            src={"https://cdn-icons-png.flaticon.com/512/3388/3388788.png"}
            alt="all"
          />
        </S.FLexColumn>
        {homeCategory.map((c, i) => {
          if (searchQuery.category && searchQuery.category !== c.name)
            return null;

          return (
            <S.FLexColumn key={i} onClick={() => handleCategory(c.name)}>
              <S.CategorysImg src={c.url} alt={c.name} />
            </S.FLexColumn>
          );
        })}
      </S.CategorysImgDiv>
      <S.Items>
        {productsList.map((p, i) =>
          productsList.length - 1 !== i ? (
            <S.Item key={i} onClick={() => handelDetail(p._id)}>
              <img src={p.image} loading="lazy" />
              <S.NamePrice>
                <Text size={18} bold={700}>
                  {p.name}
                </Text>
                <Text size={13}>₩ {String(p.price.toLocaleString())}</Text>
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
                <Text bold={700}>{p.name}</Text>
                <Text size={15}>₩ {String(p.price.toLocaleString())}</Text>
              </S.NamePrice>
            </S.Item>
          )
        )}
      </S.Items>

      {!productsList.length && (
        <S.EmptyItems>
          <Text size={15}>상품이 존재하지 않습니다.</Text>
        </S.EmptyItems>
      )}
    </S.Container>
  );
};

export default Search;
