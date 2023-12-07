import { useState, useEffect } from "react";
import ProductCard from "../components/Card";
import productService from "../services/product.service";
import address from "../../env";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
function Home() {
  // const [userDetail, setUserDetail] = useState();
  const { setIsAdmin } = useContext(MyContext);
  const navigate = useNavigate();

  const [isAllow, setIsAllow] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products_ = await productService.getProducts();
    if (products_) {
      setProducts(products_?.data.data);
    }
  };
  useEffect(() => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const allow =
        userDetails?.role == "admin" &&
        userDetails?.permissions_.some(
          (ele) => ele.title == "canDelete" && ele.module == "product"
        );
      setIsAdmin(userDetails?.role == "admin" ? true : false);
      setIsAllow(allow);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteProduct = async (id) => {
    await productService.deleteProduct(id);
    fetchProducts();
  };
  const productUpdate = (product) => {
    navigate("/addProduct", {
      state: { product },
    });
  };
  return (
    <div className="max-w-[75%] m-auto mt-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 grid-flow-row ">
      {products.length == 0 ? (
        <h2 className="text-3xl text-center flex justify-center">
          No Product Found
        </h2>
      ) : (
        products?.map((product, i) => {
          return (
            <ProductCard
              key={i}
              product={product}
              isAllow={isAllow}
              deleteProduct={deleteProduct}
              imageUrl={address.IMAGE_URL}
              productUpdate={productUpdate}
            />
          );
        })
      )}
    </div>
  );
}

export default Home;
