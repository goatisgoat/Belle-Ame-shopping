import styled from "styled-components";
import { colors } from "../../style/theme/colors";
import DatePicker from "react-datepicker";

export const AdminCouponContanier = styled.div`
  width: calc(100% - 280px);
  height: 100vh;
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 1000px) {
    width: calc(100% - 100px);
  }

  @media only screen and (max-width: 700px) {
    width: 100%;
    height: calc(100vh - 60px);
  }
`;
export const CreateCoupon = styled.div`
  width: 90%;
  display: flex;
`;

export const Xbtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const NamePrice = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ExpirationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const DatePickerContainer = styled.div`
  position: relative;
`;

export const DateCalender = styled.div`
  position: absolute;
  top: 15px;
  left: 8px;
`;

export const Dash = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 48px;
  padding: 20px;
  padding-left: 35px;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  background-color: #dddddd43;
  color: ${colors.gray_900};
  cursor: pointer;
`;
