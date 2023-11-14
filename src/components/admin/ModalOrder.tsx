import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import styled from "styled-components";
import { Order } from "../../models/order.types";
import Text from "../common/Text";
import { orderStatus } from "../../utility/utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Select from "../common/Select";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/config/ConfigStore";
import { updateOrderStatus } from "../../api/updateOrderStatus";
import CloseIcon from "@mui/icons-material/Close";
import { colors } from "../../style/theme/colors";
import { formatDate } from "../../utility/date";

const myPaddingStyle = {
  paddingTop: 10,
  paddingBottom: 10,
};

export type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderModalInfo: Order | null;
  searchQuery: { [key: string]: string };
};

const ModalOrder = ({
  orderModalInfo,
  isModalOpen,
  setIsModalOpen,
  searchQuery,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(orderModalInfo?.status);

  useEffect(() => {
    setUpdateStatus(orderModalInfo?.status);
  }, [orderModalInfo?._id]);

  const tel = orderModalInfo?.contact.contact || "";
  const hypenTel = String(tel).replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`);

  const totalPrice = orderModalInfo?.items
    .reduce((accumulator, currentObject) => {
      return accumulator + currentObject.productId.price * currentObject.qty;
    }, 0)
    .toLocaleString();

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    setUpdateStatus(e.currentTarget.id);
    setIsSelectOpen(false);
  };

  const handleUpdateStatus = () => {
    const orderId = orderModalInfo?._id;
    const status = updateStatus;

    dispatch(
      updateOrderStatus({ orderId, status, setIsModalOpen, searchQuery })
    );
  };
  return (
    <Modal isOpen={isModalOpen} setSelectOpen={setIsModalOpen}>
      <Text size="18" bold="700">
        Order Detail
      </Text>

      <UserInfo>
        <Text size="15">예약번호 : {orderModalInfo?.orderNum || ""}</Text>
        <Text size="15">
          주문날짜 :{" "}
          {orderModalInfo ? formatDate(orderModalInfo.createdAt) : ""}
        </Text>
        <Text size="15">이메일 : {orderModalInfo?.userId.email || ""}</Text>
        <Text size="15">주소 : {orderModalInfo?.shipTo.address || ""}</Text>
        <Text size="15">연락처 : {hypenTel}</Text>
      </UserInfo>
      <Text size="14" bold="600" marginBottom="10px">
        - 주문목록 -
      </Text>

      <TableContainer component={Paper} style={{ marginBottom: 20 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderModalInfo?.items.map((item) => {
              return (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={myPaddingStyle}>
                    {item._id}
                  </TableCell>
                  <TableCell align="center" style={myPaddingStyle}>
                    {item.productId.name}
                  </TableCell>
                  <TableCell align="center" style={myPaddingStyle}>
                    {item.productId.price}
                  </TableCell>
                  <TableCell align="center" style={myPaddingStyle}>
                    {item.qty}
                  </TableCell>
                  <TableCell align="center" style={myPaddingStyle}>
                    {item.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Text size="13" bold="600" marginBottom="20px">
        Total Price - ₩ {String(totalPrice)}
      </Text>
      <Text size="15" bold="600" marginBottom="10px">
        Status
      </Text>
      <Select
        list={orderStatus}
        handleSelect={handleSelect}
        isSelectOpen={isSelectOpen}
        setSelectOpen={setIsSelectOpen}
        defaultOption={updateStatus || ""}
      />
      <EditBtnDiv>
        <Button
          paddingSide="15"
          borderRadius="20"
          background={colors.preparing}
          Fontcolor={colors.basicWithBrown}
          onClick={handleUpdateStatus}
        >
          Edit
        </Button>
      </EditBtnDiv>
      <Xbtn onClick={() => setIsModalOpen(false)}>
        {" "}
        <CloseIcon />
      </Xbtn>
    </Modal>
  );
};

export default ModalOrder;

export const Xbtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const EditBtnDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: right;
`;

export const UserInfo = styled.div`
  border-top: 1px solid ${colors.inputBorder};

  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 0;

  & > span {
    margin-bottom: 5px;
  }
`;
