import { useEffect, useState } from "react";
import AdminSearch from "../../components/admin/AdminSearch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { orderColumns } from "../../utility/utils";
import { getAllUsersOrder } from "../../api/getAllUsersOrder";
import OrderTableCell from "../../components/admin/OrderTableCell";
import OrderModal from "../../components/admin/ModalOrder";
import { Order } from "../../models/order.types";
import * as S from "./AdminOrderpage.styled";

const AdminOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderModalInfo, setOrderModalInfo] = useState<Order | null>(null);

  //search
  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    page: query.get("page") || "1",
    name: query.get("orderNum") || "",
  });

  const { adminOrderList, totalPageNum } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    if (searchQuery?.name === "") {
      delete searchQuery.name;
    }

    const params = new URLSearchParams(searchQuery).toString();
    navigate(`?${params}`);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(getAllUsersOrder({ search: { ...searchQuery }, navigate }));
  }, [query]);

  //pagenations
  const handlePagenation = (event: unknown, newPage: number) => {
    setSearchQuery({ ...searchQuery, page: newPage.toString() });
    const table = document.getElementById("my-table");

    if (table) {
      table.scrollTop = -100;
    } else {
      console.error("Element 'my-table' not found");
    }
  };

  const changeModalInfoAndModal = (row: Order) => {
    setOrderModalInfo({ ...row });
    setIsModalOpen(true);
  };

  return (
    <S.AdminOrderContanier>
      <AdminSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />
      <Paper sx={{ width: "90%", overflow: "hidden", marginTop: 5 }}>
        <TableContainer sx={{ maxHeight: 500 }} id="my-table">
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
              {adminOrderList?.map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {orderColumns.map((column) => {
                      return (
                        <TableCell
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
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        style={{ marginTop: 20, marginBottom: 10 }}
        shape="rounded"
        count={totalPageNum || 0}
        onChange={handlePagenation}
        page={Number(query.get("page"))}
      />
      <OrderModal
        orderModalInfo={orderModalInfo}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
      />
    </S.AdminOrderContanier>
  );
};

export default AdminOrderPage;
