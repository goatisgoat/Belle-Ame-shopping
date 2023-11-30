import React, { ChangeEvent, useState } from "react";
import Modal from "../modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Input from "../common/Input";
import Select from "../common/Select";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Text from "../common/Text";
import { colors } from "../../style/theme/colors";
import Button from "../common/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveIcon from "@mui/icons-material/Remove";
import * as S from "../../pages/admin/AdminCoupon.styled";
import styled from "styled-components";

export const couponCategory = [
  "All",
  "top",
  "dress",
  "skirt",
  "shirt",
  "jacket",
  "coat",
];

export type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type CouponInfo = {
  name: string;
  minimumPrice: number;
  category: string;
  startDate: Date | null;
  expiredDate: Date | null;
};

const initialCouponInfo = {
  name: "",
  minimumPrice: 0,
  category: "All",
  startDate: null,
  expiredDate: null,
};

const ModalCoupon = ({ isModalOpen, setIsModalOpen }: Props) => {
  //modal
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  //state
  const [couponInfo, setCouponInfo] = useState<CouponInfo>(initialCouponInfo);

  //date
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [expiredDate, setExpiredDate] = useState<Date | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let { id, value } = e.currentTarget;
    switch (id) {
      case "minimumPrice":
        setCouponInfo({
          ...couponInfo,
          [id]: Number(value.replaceAll(",", "")),
        });

        return;

      default:
    }

    setCouponInfo({
      ...couponInfo,
      [id]: value,
    });
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const couponCategory = e.currentTarget.id;
    setCouponInfo({ ...couponInfo, category: couponCategory });
    setIsCategoryOpen(false);
  };

  const handleCouponCreate = () => {
    if (expiredDate && startDate > expiredDate) {
    }
    setCouponInfo({
      ...couponInfo,
      startDate: startDate,
      expiredDate: expiredDate,
    });
  };
  return (
    <Modal isOpen={isModalOpen} setSelectOpen={setIsModalOpen}>
      <Text size={20} marginBottom={30} bold={500} color={colors.gray_400}>
        Create Coupon
      </Text>

      <S.Xbtn onClick={() => setIsModalOpen(false)}>
        <CloseIcon />
      </S.Xbtn>

      <S.NamePrice>
        <div>
          <Text size={15} marginBottom={5}>
            Coupon-name
          </Text>
          <Input
            id="name"
            type="text"
            value={couponInfo.name}
            onChange={handleInput}
            spanColor={colors.white}
          />
        </div>
        <div>
          <Text size={15} marginBottom={5}>
            Minimum purchase
          </Text>
          <Input
            id="minimumPrice"
            type="text"
            value={
              couponInfo.minimumPrice
                .toString()
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""
            }
            onChange={handleInput}
            spanColor={colors.white}
          />
        </div>
      </S.NamePrice>
      <CategoryContainer>
        <Text size={15} marginBottom={5}>
          category
        </Text>
        <Select
          list={couponCategory}
          handleSelect={handleCategory}
          isSelectOpen={isCategoryOpen}
          setSelectOpen={setIsCategoryOpen}
          defaultOption={couponInfo.category}
          isError={false}
        />
      </CategoryContainer>
      <Text size={15} marginBottom={15}>
        coupon-expiration
      </Text>

      <S.ExpirationContainer>
        <S.DatePickerContainer>
          <S.DateCalender>
            <CalendarTodayIcon style={{ fontSize: "16px" }} />
          </S.DateCalender>
          <S.StyledDatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            locale={ko}
            dateFormat="yyyy.MM.dd"
            closeOnScroll={true}
          />
        </S.DatePickerContainer>

        <S.Dash>
          <RemoveIcon style={{ fontSize: "16px" }} />
        </S.Dash>

        <S.DatePickerContainer>
          <S.DateCalender>
            <CalendarTodayIcon style={{ fontSize: "16px" }} />
          </S.DateCalender>
          <S.StyledDatePicker
            selected={expiredDate}
            onChange={(date) => date && setExpiredDate(date)}
            locale={ko}
            dateFormat="yyyy.MM.dd"
            closeOnScroll={true}
          />
        </S.DatePickerContainer>
      </S.ExpirationContainer>
      <BtnContainer>
        <Button
          Fontcolor={colors.basicWithBrown}
          background={colors.basic}
          borderRadius="3"
          paddingTop="10"
          paddingSide="15"
          onClick={handleCouponCreate}
        >
          Create Coupon
        </Button>
      </BtnContainer>
    </Modal>
  );
};

export default ModalCoupon;

export const CategoryContainer = styled.div`
  margin-bottom: 30px;
`;

export const BtnContainer = styled.div`
  position: absolute;
  bottom: 20px;
`;
