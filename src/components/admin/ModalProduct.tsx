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
        <Text size={20} bold={500} color={colors.gray_400}>
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
          <Input
            id="sku"
            type="text"
            placeholder="Sku"
            value={newProduct.sku}
            onChange={handleNewProduct}
            isError={errors.sku}
            spanColor={colors.white}
          />
        </div>
        <div>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleNewProduct}
            isError={errors.name}
            spanColor={colors.white}
          />
        </div>
      </S.SkuName>
      <S.Description $isError={errors.description}>
        <S.Textarea
          id="description"
          value={newProduct.description}
          onChange={handleNewProduct}
        />
        <span>Description</span>
      </S.Description>

      <S.StokeDiv>
        <Text
          size={15}
          color={errors.stock ? "#f86c6c" : colors.gray_300}
          marginRight={10}
        >
          Stoke
        </Text>

        <Button
          Fontcolor={colors.basicWithBrown}
          background={colors.antiquewhite}
          borderRadius="20"
          paddingTop="10"
          paddingSide="15"
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
          <Input
            id="price"
            type="text"
            placeholder="Price"
            spanColor={colors.white}
            value={
              newProduct.price
                .toString()
                .replace(/\D/g, "")
                .replace(/^0+/, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""
            }
            onChange={handleNewProduct}
            isError={errors.price}
          />
        </div>

        <div>
          <MultiSelect
            list={Category}
            handleSelect={handleCategory}
            isSelectOpen={isCategoryOpen}
            setSelectOpen={setIsCategoryOpen}
            selectedList={newProduct.category}
            isError={errors.category}
          />
        </div>

        <div>
          <Select
            list={productStatus}
            handleSelect={handleStatus}
            isSelectOpen={isStatusOpen}
            setSelectOpen={setIsStatusOpen}
            defaultOption={newProduct.status}
            spanString="Status"
            isError={errors.status}
          />
        </div>
      </S.SelectDiv>
      <Button
        Fontcolor={colors.basicWithBrown}
        background={colors.antiquewhite}
        borderRadius="20"
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
