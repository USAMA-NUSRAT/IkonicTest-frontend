import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/product.service";
import { useLocation } from "react-router-dom";
// import { MyContext } from "../MyContext";
export default function Product() {
  const location = useLocation();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleOpenFile = () => {
    inputRef.current.click();
  };
  const addProduct = async (e) => {
    e.preventDefault();
    const errors_ = {};
    if (productData.image == "") {
      errors_.image = "required";
    }
    setErrors(errors_);

    if (Object.keys(errors_).length == 0) {
      try {
        const formData = new FormData();
        formData.append("name", productData?.name);
        formData.append("description", productData?.description);
        formData.append("image", productData?.image);
        formData.append("price", productData?.price);
        formData.append("category", productData?.category);

        let result;
        if (!location.state && formData) {
          result = await productService.createProduct(formData);
        } else {
          result = await productService.updateProduct(
            location.state.product._id,
            formData
          );
        }

        toast.success(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        setProductData({
          name: "",
          description: "",
          price: 0,
          category: "",
          image: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
        // setProductData({ name: "", email: "", password: "" });
      } catch (err) {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  useEffect(() => {
    if (location.state) {
      setProductData(location.state.product);
    } else {
      setProductData({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
      });
    }
  }, [location.state]);
  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {location.state ? "Update Your Product" : "Add Product"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={addProduct}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  value={productData.price}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  autoComplete="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleOpenFile}
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 h-[40px] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {productData.image ? "Update Image" : "Add Image"}
              </button>
              {!location.state && productData?.image && (
                <img
                  height="60px"
                  width="80px"
                  src={URL.createObjectURL(productData?.image)}
                />
              )}
              <input
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    ["image"]: e.target.files[0],
                  });
                  setErrors({});
                }}
              />
            </div>
            {"image" in errors ? (
              <p className="text-red-600">{errors["image"]}</p>
            ) : null}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {location.state ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
