import Modal from "../modal/Modal";
import * as S from "../../pages/admin/AdminProduct.styled";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import UploadWidget from "../../utility/UploadWidget";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MultiSelect from "../select/MultiSelect";
import Stock from "./Stock";
import { Category, productStatus } from "../../utility/utils";
import { colors } from "../../style/theme/colors";
import { ModalProductProps } from "../../models/product.type";
import Select from "../common/Select";
import Input from "../common/Input";
import Text from "../common/Text";
import Button from "../common/Button";

const ModalProduct = ({
  isModalOpen,
  setIsModalOpen,
  errors,
  updateError,
  stokes,
  isStatusOpen,
  setIsStatusOpen,
  isCategoryOpen,
  setStokes,
  handelAddStock,
  handleImg,
  handleCategory,
  setIsCategoryOpen,
  handleStatus,
  newProduct,
  handleNewProduct,
  handleCreate,
  mode,
}: ModalProductProps) => {
  return (
    <Modal isOpen={isModalOpen} setSelectOpen={setIsModalOpen}>
      <S.ModalTitle>
        <Text size={20} bold={500} color={colors.gray_400} marginBottom={15}>
          Create Product
        </Text>
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
            <Text color={colors.gray_300}>Sku</Text>
            {errors.sku ? (
              <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
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
            <Text color={colors.gray_300}>Name</Text>
            {errors.name ? (
              <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
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
          <Text color={colors.gray_300}>Description</Text>
          {errors.description ? (
            <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
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
          <Text color={colors.gray_300}>Stoke</Text>
          {errors.stock ? (
            <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
          ) : null}
        </S.Flex>
        <Button
          Fontcolor={colors.basicWithBrown}
          background={colors.basic}
          borderRadius="3"
          paddingTop="8"
          paddingSide="10"
          onClick={handelAddStock}
        >
          Add
        </Button>
      </S.StokeDiv>

      {stokes.map((s, i) => (
        <Stock
          key={`${stokes.length} ${i}`}
          stock={s}
          indexNum={i}
          stokes={stokes}
          setStokes={setStokes}
          updateError={updateError}
        />
      ))}
      <S.ImgDiv>
        <UploadWidget handleImg={handleImg} imgError={errors.image} />
      </S.ImgDiv>

      {newProduct.image && (
        <S.ProductImg>
          <img src={newProduct.image} />
        </S.ProductImg>
      )}

      <S.SelectDiv>
        <div>
          <S.Flex>
            <Text color={colors.gray_300}>Price</Text>
            {errors.price ? (
              <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
            ) : null}
          </S.Flex>
          <Input
            id="price"
            type="text"
            value={
              newProduct.price
                .toString()
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""
            }
            onChange={handleNewProduct}
          />
        </div>

        <div>
          <S.Flex>
            <Text color={colors.gray_300}>Category</Text>
            <LibraryAddIcon
              fontSize="small"
              style={{
                color: `${errors.category ? "#f86c6c" : colors.gray_300}`,
              }}
            />
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
            <Text color={colors.gray_300}>Status</Text>
            {errors.status ? (
              <ErrorOutlineIcon fontSize="small" style={{ color: "#f86c6c" }} />
            ) : null}
          </S.Flex>

          <Select
            list={productStatus}
            handleSelect={handleStatus}
            isSelectOpen={isStatusOpen}
            setSelectOpen={setIsStatusOpen}
            defaultOption={newProduct.status}
          />
        </div>
      </S.SelectDiv>
      <Button
        Fontcolor={colors.basicWithBrown}
        background={colors.basic}
        borderRadius="3"
        paddingTop="10"
        paddingSide="15"
        onClick={handleCreate}
      >
        {mode === "new" ? "Create Product" : "Edit"}
      </Button>
    </Modal>
  );
};

export default ModalProduct;
