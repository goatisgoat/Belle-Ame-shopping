import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { CustomFontTableCell, orderColumns } from "../../utility/utils";
import OrderTableCell from "../../components/admin/OrderTableCell";
import AdminSearch from "../../components/admin/AdminSearch";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../style/theme/colors";
import Button from "../../components/common/Button";
import ModalCoupon from "../../components/admin/ModalCoupon";
import * as S from "../../pages/admin/AdminCoupon.styled";

const AdminCoupon = () => {
  //search
  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    page: query.get("page") || "1",
    name: query.get("orderNum") || "",
  });

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponInfo, setCouponInfo] = useState<null>(null);

  const handelCreateCoupon = () => {
    setIsModalOpen(true);
  };

  return (
    <S.AdminCouponContanier>
      <AdminSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />

      <S.CreateCoupon>
        <Button
          Fontcolor={colors.basicWithBrown}
          background={colors.basic}
          borderRadius="3"
          paddingTop="10"
          paddingSide="15"
          onClick={handelCreateCoupon}
        >
          Create Coupon
        </Button>
      </S.CreateCoupon>

      <Paper sx={{ width: "90%", overflow: "hidden", marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: "100%" }} id="my-table">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {orderColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              add ada asdad asdad
              {/* {adminOrderList?.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {orderColumns.map((column) => {
                      return (
                        <CustomFontTableCell
                          key={column.id}
                          align={column.align}
                          style={{ cursor: "pointer" }}
                          onClick={() => changeModalInfoAndModal(row)}
                        >
                          <OrderTableCell
                            row={row}
                            column={column}
                            length={i}
                            page={Number(query.get("page"))}
                          />
                        </CustomFontTableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ModalCoupon isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </S.AdminCouponContanier>
  );
};

export default AdminCoupon;
