const ProductCard = ({
  isAllow,
  product,
  deleteProduct,
  imageUrl,
  productUpdate,
}) => {
  return (
    <div className="max-w-sm rounded h-[50vh] overflow-hidden shadow-lg mt-2">
      <img className="w-full h-[60%]" src={`${imageUrl}/${product?.image}`} />
      <hr />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product?.name}</div>
        <p className="text-gray-700 text-base">{product?.description}</p>
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {product?.category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            ${product?.price}
          </span>
        </div>
        {isAllow && (
          <div className="px-6 py-4">
            <button
              onClick={() => productUpdate(product)}
              type="button"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 px-2.5 py-1.5 ml-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => deleteProduct(product?._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
