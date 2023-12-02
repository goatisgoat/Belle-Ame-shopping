import { useState, useEffect, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import * as S from "./AdminProduct.styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Product, Stoke } from "../../models/product.type";
import { createToastify } from "../../redux/modules/toastifySlice";
import { createProduct } from "../../api/createProduct";
import { getProductAdmin } from "../../api/getProductAdmin";
import { updateProduct } from "../../api/updateProduct";
import { deleteProduct } from "../../api/deleteProduct";
import {
  productColumns,
  initialNewProduct,
  initialErrors,
  CustomFontTableCell,
} from "../../utility/utils";
import AdminSearch from "../../components/admin/AdminSearch";
import ProductTableCell from "../../components/admin/ProductTableCell";
import ModalProduct from "../../components/admin/ModalProduct";
import { colors } from "../../style/theme/colors";
import Button from "../../components/common/Button";

const AdminProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //search
  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    page: query.get("page") || "1",
    name: query.get("name") || "",
  });

  const [newProduct, setNewProduct] = useState(initialNewProduct);
  const [stokes, setStokes] = useState<Stoke[]>([]);
  const [imgUrl, setimgUrl] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  //
  const [editProductId, setEditProductId] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  //modal
  const [isModalopen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("new");

  const { productsList, totalPageNum } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (searchQuery?.name === "") {
      delete searchQuery.name;
    }

    const params = new URLSearchParams(searchQuery).toString();
    navigate(`?${params}`);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(getProductAdmin({ ...searchQuery }));
  }, [query]);

  const handlePagenation = (_: unknown, newPage: number) => {
    setSearchQuery({ ...searchQuery, page: newPage.toString() });
    const table = document.getElementById("my-table");

    if (table) {
      table.scrollTop = -100;
    } else {
      console.error("Element 'my-table' not found");
    }
  };

  // 에러 업데이트
  const updateError = (field: string, value: boolean) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value,
    }));
  };

  //삭제
  const handleDeleteProduct = async (row: Product) => {
    const confirmResult = window.confirm("삭제하시겠습니까?");

    if (confirmResult) {
      await dispatch(deleteProduct({ deleteProductId: row._id, navigate }));
      return dispatch(getProductAdmin({ ...searchQuery }));
    }
  };

  //에딧 모달 오픈
  const handleOpenEditProduct = (row: Product) => {
    const StockArray = Object.keys(row.stock).map((i) => ({
      size: i,
      quantity: Number(row.stock[i]),
    }));

    setNewProduct({ ...row });
    setStokes(StockArray);
    //////////
    setEditProductId(row._id);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleOpenCreateProduct = (type: string) => {
    const isCurrentPrevClickNew = type === "new" && mode === "new";

    if (isCurrentPrevClickNew) {
      setIsModalOpen(true);
      setMode("new");
    } else {
      setNewProduct(initialNewProduct);
      setStokes([]);
      setimgUrl("");
      setIsModalOpen(true);
      setMode("new");
    }
  };

  const handleCategory = (e: React.MouseEvent<HTMLElement>) => {
    const category = e.currentTarget.id;

    if (newProduct.category.includes(category)) {
      const filtered = newProduct.category.filter((c) => c !== category);

      return setNewProduct({
        ...newProduct,
        category: filtered,
      });
    }

    setNewProduct({
      ...newProduct,
      category: [...newProduct.category, category],
    });

    updateError("category", false);
  };

  const handleStatus = (e: React.MouseEvent<HTMLElement>) => {
    const status = e.currentTarget.id;

    setNewProduct({
      ...newProduct,
      status: status,
    });

    setIsStatusOpen(false);
    updateError("status", false);
  };

  const handelAddStock = () => {
    setStokes([...stokes, { size: null, quantity: null }]);
  };

  const handleNewProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { id, value } = e.currentTarget;

    switch (id) {
      case "sku":
        updateError("sku", false);
        break;

      case "name":
        updateError("name", false);
        break;

      case "description":
        updateError("description", false);
        break;

      case "price":
        setNewProduct({
          ...newProduct,
          [id]: Number(value.replaceAll(",", "")),
        });
        updateError("price", false);
        return;

      default:
    }
    setNewProduct({
      ...newProduct,
      [id]: value,
    });
  };

  //img-3
  const createImg = () => {
    setNewProduct({
      ...newProduct,
      image: imgUrl,
    });
    updateError("image", false);
  };

  //img-2
  useEffect(() => {
    createImg();
  }, [imgUrl]);

  //img-1
  const handleImg = (url: string) => {
    setimgUrl(url);
  };

  //submit
  const handleCreate = async () => {
    const { sku, name, description, image, price, category, status } =
      newProduct;

    let haveBlankFoam = false;

    //error check
    const fieldsToCheck = [
      { field: "sku", value: sku },
      { field: "name", value: name },
      { field: "description", value: description },
      { field: "image", value: image },
      { field: "price", value: price },
      { field: "category", value: category.length },
      { field: "status", value: status },
    ];

    fieldsToCheck.forEach((obj) => {
      if (!obj.value) {
        updateError(obj.field, true);
        haveBlankFoam = true;
      }
    });

    const isStockLength = stokes.length === 0;
    const haveStockInfo = !stokes.every(
      (s) => s["size"] !== null && s["quantity"] !== null && s["quantity"] > 0
    );

    if (isStockLength || haveStockInfo) {
      updateError("stock", true);
      haveBlankFoam = true;
    }

    if (haveBlankFoam) {
      return dispatch(
        createToastify({ status: "error", message: "내용을 입력해주세요" })
      );
    }

    const totalStocks = stokes.reduce((total: any, item: any) => {
      return { ...total, [item["size"]]: item.quantity };
    }, {});

    const combined = {
      ...newProduct,
      stock: totalStocks,
    };

    if (mode === "new") {
      await dispatch(createProduct({ combined, navigate }));
      //초기화
      setNewProduct(initialNewProduct);
      setStokes([]);
      setimgUrl("");
      setIsModalOpen(false);
      setMode("new");
    } else if (mode === "edit") {
      await dispatch(
        updateProduct({
          combined,
          setIsModalOpen,
          editProductId,
          searchQuery,
          navigate,
        })
      );
    }

    return dispatch(getProductAdmin({ ...searchQuery }));
  };

  return (
    <>
      <S.AdminContanier>
        <AdminSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          keyWord={keyWord}
          setKeyWord={setKeyWord}
        />
        <S.CreateBtnAdmin>
          <Button
            Fontcolor={colors.basicWithBrown}
            background={colors.antiquewhite}
            borderRadius="20"
            paddingTop="10"
            paddingSide="15"
            onClick={() => handleOpenCreateProduct("new")}
          >
            Create Product +
          </Button>
        </S.CreateBtnAdmin>
        <Paper sx={{ width: "90%", overflow: "hidden", marginTop: 3 }}>
          <TableContainer sx={{ maxHeight: "100%" }} id="my-table">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {productColumns.map((column) => (
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
                {productsList.map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {productColumns.map((column) => {
                        return (
                          <CustomFontTableCell
                            key={column.id}
                            align={column.align}
                          >
                            <ProductTableCell
                              row={row}
                              column={column}
                              length={i}
                              page={Number(query.get("page"))}
                              handleDeleteProduct={handleDeleteProduct}
                              handleEditProduct={handleOpenEditProduct}
                            />
                          </CustomFontTableCell>
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
          style={{ marginTop: 20, marginBottom: 30 }}
          shape="rounded"
          count={totalPageNum || 0}
          onChange={handlePagenation}
          page={Number(query.get("page"))}
        />
      </S.AdminContanier>

      <ModalProduct
        isModalOpen={isModalopen}
        setIsModalOpen={setIsModalOpen}
        errors={errors}
        updateError={updateError}
        stokes={stokes}
        setStokes={setStokes}
        handelAddStock={handelAddStock}
        handleImg={handleImg}
        handleCategory={handleCategory}
        setIsCategoryOpen={setIsCategoryOpen}
        isStatusOpen={isStatusOpen}
        setIsStatusOpen={setIsStatusOpen}
        handleStatus={handleStatus}
        newProduct={newProduct}
        handleNewProduct={handleNewProduct}
        handleCreate={handleCreate}
        isCategoryOpen={isCategoryOpen}
        mode={mode}
      />
    </>
  );
};

export default AdminProduct;
