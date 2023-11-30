import React from "react";
import styled from "styled-components";
import { colors } from "../../style/theme/colors";

type Props = {
  searchQuery: { [key: string]: string };
  setSearchQuery: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    }>
  >;
  keyWord: string;
  setKeyWord: React.Dispatch<React.SetStateAction<string>>;
};

const AdminSearch = ({
  searchQuery,
  setSearchQuery,
  keyWord,
  setKeyWord,
}: Props) => {
  const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery({
        ...searchQuery,
        page: "1",
        name: e.currentTarget.value,
      });
    }
  };

  return (
    <Search>
      <input
        type="search"
        placeholder="Search"
        onKeyDown={onCheckEnter}
        onChange={(e) => setKeyWord(e.target.value)}
        value={keyWord}
      />
    </Search>
  );
};

export default AdminSearch;

export const Search = styled.div`
  width: 90%;
  height: 35px;
  padding-left: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.gray_900};
  border-radius: 3px;

  & > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }

  @media only screen and (max-width: 700px) {
    display: none;
  }
`;
