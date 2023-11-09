import { useState, useEffect, ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/config/ConfigStore";
import * as S from "./AdminProduct.styled";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TableColumn,
  InitialNewProduct,
  Product,
  Stoke,
} from "../../models/product.type";
import { createToastify } from "../../redux/modules/toastifySlice";
import { createProduct } from "../../api/createProduct";
import { getProductAdmin } from "../../api/getProductAdmin";
import Stock from "../../components/admin/Stock";
import UploadWidget from "../../utility/UploadWidget";
import MultiSelect from "../../components/select/MultiSelect";
import Select from "../../components/common/Select";
import { updateProduct } from "../../api/updateProduct";
import { deleteProduct } from "../../api/deleteProduct";
import Input from "../../components/common/Input";

const Category = ["top", "dress", "skirt", "shirt", "jscket", "coat"];
const Status = ["panding", "Shipped", "done"];

const columns: readonly TableColumn[] = [
  { id: "num", label: "#", minWidth: 70 },
  { id: "sku", label: "Sku", minWidth: 120 },
  { id: "name", label: "name", minWidth: 120 },
  {
    id: "price",
    label: "price",
    minWidth: 120,
    align: "center",
  },
  {
    id: "stock",
    label: "stock",
    minWidth: 170,
    align: "center",
  },
  {
    id: "image",
    label: "image",
    minWidth: 120,
    align: "center",
  },
  {
    id: "status",
    label: "status",
    minWidth: 120,
    align: "center",
  },
  { id: "deleteEdit", label: "*", minWidth: 70, align: "center" },
];

const AdminProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { productsList, totalPageNum } = useSelector(
    (state: RootState) => state.product
  );

  //search
  const [query, setQuery] = useSearchParams();
  const [keyWord, setKeyWord] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    [key: string]: string;
  }>({
    page: query.get("page") || "1",
    name: query.get("name") || "",
  });

  const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery({
        ...searchQuery,
        page: "1",
        name: e.currentTarget.value,
      });
    }
  };

  const handlePagenation = (event: unknown, newPage: number) => {
    setSearchQuery({ ...searchQuery, page: newPage.toString() });
    const table = document.getElementById("my-table");

    if (table) {
      table.scrollTop = -100;
    } else {
      console.error("Element 'my-table' not found");
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
    dispatch(getProductAdmin({ ...searchQuery }));
  }, [query]);

  ///
  const TableCellFc = (row: Product, column: TableColumn, index: number) => {
    if (column.id === "image") {
      return <S.TableImg src={row[column.id]} />;
    }

    if (column.id === "num") {
      return <div>{index}</div>;
    }

    if (column.id === "stock") {
      const stock = row["stock"];

      const stockElements = [];

      for (const [key, value] of Object.entries(stock)) {
        stockElements.push(
          <div key={key}>
            {key} : {value}
          </div>
        );
      }

      return stockElements;
    }

    if (column.id === "deleteEdit") {
      return (
        <S.TableDeleteEdit>
          <button onClick={() => handleDeleteProduct(row)}> delete</button>
          <button onClick={() => handleEditProduct(row)}>edit</button>
        </S.TableDeleteEdit>
      );
    }

    return <div>{row[column.id]}</div>;
  };

  ////
  const initialNewProduct: InitialNewProduct = {
    name: "",
    sku: "",
    stock: {},
    image: "",
    description: "",
    category: [],
    status: "",
    price: 0,
  };
  const [newProduct, setNewProduct] = useState(initialNewProduct);
  const [stokes, setStokes] = useState<Stoke[]>([]);
  const [imgUrl, setimgUrl] = useState("");
  const [editProductId, setEditProductId] = useState("");

  const [mode, setMode] = useState("new");

  //modal
  const [isModalopen, setIsModalOpen] = useState(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  //error
  const [skuError, setSkuError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [desError, setDesError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [cateError, setCateError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  const handleDeleteProduct = (row: Product) => {
    const confirmResult = window.confirm("삭제하시겠습니까?");

    if (confirmResult) {
      dispatch(deleteProduct({ deleteProductId: row._id }));
    }
  };

  const handleEditProduct = (row: Product) => {
    const StockArray = Object.keys(row.stock).map((i) => ({
      size: i,
      quantity: Number(row.stock[i]),
    }));

    setNewProduct({ ...row });
    setStokes(StockArray);
    setEditProductId(row._id);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleCreateProduct = (type: string) => {
    if (type === "new" && mode === "new") {
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

    setCateError(false);
  };

  const handleStatus = (e: React.MouseEvent<HTMLElement>) => {
    const status = e.currentTarget.id;
    setIsStatusOpen(false);

    setNewProduct({
      ...newProduct,
      status: status,
    });

    setStatusError(false);
  };

  const handelAddStock = () => {
    setStokes([...stokes, { size: null, quantity: null }]);
  };

  const handleNewProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.currentTarget.id) {
      case "sku":
        setSkuError(false);
        break;
      case "name":
        setNameError(false);
        break;
      case "description":
        setDesError(false);
        break;
      case "price":
        setPriceError(false);
        break;

      default:
    }
    setNewProduct({
      ...newProduct,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  //img
  const createImg = () => {
    setNewProduct({
      ...newProduct,
      image: imgUrl,
    });
    setImgError(false);
  };

  useEffect(() => {
    createImg();
  }, [imgUrl]);

  const handleImg = (url: string) => {
    setimgUrl(url);
  };

  //submit
  const handleCreate = () => {
    const { sku, name, description, image, price, category, status } =
      newProduct;

    const fieldsToCheck = [
      { field: !sku, errorSetter: setSkuError },
      { field: !name, errorSetter: setNameError },
      { field: !description, errorSetter: setDesError },
      { field: !image, errorSetter: setImgError },
      { field: !price, errorSetter: setPriceError },
      { field: !category.length, errorSetter: setCateError },
      { field: !status, errorSetter: setStatusError },
    ];

    fieldsToCheck.forEach(({ field, errorSetter }) => {
      if (field) {
        errorSetter(true);
      }
    });

    if (
      stokes.length === 0 ||
      !stokes.every(
        (s) => s["size"] !== null && s["quantity"] !== null && s["quantity"] > 0
      )
    ) {
      setStockError(true);
    }

    if (
      !(
        sku &&
        name &&
        description &&
        image &&
        price &&
        category.length &&
        status &&
        stokes.length
      )
    ) {
      return dispatch(
        createToastify({ status: "error", message: "내용을 입력해주세요" })
      );
    }

    const totalStocks = stokes.reduce((total: any, item: any) => {
      return { ...total, [item["size"]]: item.quantity };
    }, {});

    const combined = { ...newProduct, stock: totalStocks };

    if (mode === "new") {
      return dispatch(createProduct({ combined, setIsModalOpen }));
    } else if (mode === "edit") {
      return dispatch(
        updateProduct({ combined, setIsModalOpen, editProductId, searchQuery })
      );
    }
  };

  console.log(isModalopen, "isModalopen");

  return (
    <>
      <S.AdminContanier>
        <S.Search>
          <input
            type="search"
            placeholder="Search"
            onKeyDown={onCheckEnter}
            onChange={(e) => setKeyWord(e.target.value)}
            value={keyWord}
          />
        </S.Search>
        <S.CreateBtnAdmin>
          <button onClick={() => handleCreateProduct("new")}>
            Create Product
          </button>
        </S.CreateBtnAdmin>
        <Paper sx={{ width: "90%", overflow: "hidden", marginTop: 5 }}>
          <TableContainer sx={{ maxHeight: 500 }} id="my-table">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
                      {columns.map((column) => {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {TableCellFc(row, column, i)}
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
      </S.AdminContanier>

      {isModalopen ? (
        <S.OuterModal>
          <S.InnerModal
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <S.ModalTitle>
              <div>Create Product</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
              >
                <CloseIcon />
              </button>
            </S.ModalTitle>
            <S.SkuName>
              <div>
                <S.Flex>
                  <div>Sku</div>
                  {skuError ? (
                    <ErrorOutlineIcon
                      fontSize="small"
                      style={{ color: "#f86c6c" }}
                    />
                  ) : null}
                </S.Flex>
                <Input
                  id="sku"
                  type="text"
                  value={newProduct.sku}
                  onChange={handleNewProduct}
                />
              </div>
              <div>
                <S.Flex>
                  <div>Name</div>
                  {nameError ? (
                    <ErrorOutlineIcon
                      fontSize="small"
                      style={{ color: "#f86c6c" }}
                    />
                  ) : null}
                </S.Flex>
                <Input
                  id="name"
                  type="text"
                  value={newProduct.name}
                  onChange={handleNewProduct}
                />
              </div>
            </S.SkuName>
            <S.Description>
              <S.Flex>
                <div>Description</div>
                {desError ? (
                  <ErrorOutlineIcon
                    fontSize="small"
                    style={{ color: "#f86c6c" }}
                  />
                ) : null}
              </S.Flex>
              <S.Textarea
                id="description"
                value={newProduct.description}
                onChange={handleNewProduct}
              />
            </S.Description>

            <S.StokeDiv>
              <S.Flex>
                <div>Stoke</div>
                {stockError ? (
                  <ErrorOutlineIcon
                    fontSize="small"
                    style={{ color: "#f86c6c" }}
                  />
                ) : null}
              </S.Flex>
              <button onClick={handelAddStock}>button</button>
            </S.StokeDiv>

            {stokes.map((s, i) => (
              <Stock
                key={`${stokes.length} ${i}`}
                stock={s}
                indexNum={i}
                stokes={stokes}
                setStokes={setStokes}
                setStockError={setStockError}
              />
            ))}
            <S.ImgDiv>
              <UploadWidget handleImg={handleImg} imgError={imgError} />
            </S.ImgDiv>

            {newProduct.image && (
              <S.ProductImg>
                <img src={newProduct.image} />
              </S.ProductImg>
            )}

            <S.SelectDiv>
              <div>
                <S.Flex>
                  <div>Price</div>
                  {priceError ? (
                    <ErrorOutlineIcon
                      fontSize="small"
                      style={{ color: "#f86c6c" }}
                    />
                  ) : null}
                </S.Flex>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleNewProduct}
                />
              </div>

              <div>
                <S.Flex>
                  <div>Category</div>
                  {cateError ? (
                    <ErrorOutlineIcon
                      fontSize="small"
                      style={{ color: "#f86c6c" }}
                    />
                  ) : null}
                </S.Flex>

                <MultiSelect
                  list={Category}
                  handleSelect={handleCategory}
                  isSelectOpen={isCategoryOpen}
                  setSelectOpen={setIsCategoryOpen}
                  selectedList={newProduct.category}
                />
              </div>

              <div>
                <S.Flex>
                  <div>Status</div>
                  {statusError ? (
                    <ErrorOutlineIcon
                      fontSize="small"
                      style={{ color: "#f86c6c" }}
                    />
                  ) : null}
                </S.Flex>

                <Select
                  list={Status}
                  handleSelect={handleStatus}
                  isSelectOpen={isStatusOpen}
                  setSelectOpen={setIsStatusOpen}
                  defaultOption={newProduct.status}
                />
              </div>
            </S.SelectDiv>
            <S.CreateBtn onClick={handleCreate}>
              {mode === "new" ? "Create Product" : "Edit"}
            </S.CreateBtn>
          </S.InnerModal>
        </S.OuterModal>
      ) : null}
    </>
  );
};

export default AdminProduct;
