import "./App.css";
const Product = ({
  products,
  addToCart,
  filterProduct,
  filterCategory,
  filtertedProducts,
}) => {
  console.log(products);
  return (
    <>
      <div className="container product">
        <h3 className="fw-bold text-center product-head">
          Check out what's new
        </h3>
        <h5 className="product-subhead">
          Latest of the trends we have to offer
        </h5>
        <div className="product-category mt-5">
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            {filterCategory.map((btn) => (
              <>
                <button
                  className="btn btn-product"
                  onClick={() => filtertedProducts(btn)}
                >
                  {btn.category}
                </button>
              </>
            ))}
          </div>
        </div>
        <div>
          {filterProduct.length ? (
            <div className="product-list row justify-content-center my-5 p-0">
              {filterProduct.map((product) => (
                <div className="col-md-3 my-3" key={product._id}>
                  <img
                    src={product.image.url}
                    className="img-fluid"
                    alt={product.name}
                  />
                  <p className="product-name">{product.name}</p>
                  <p className="product-category">{product.category}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="product-price">${product.price}</p>
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-list row justify-content-center my-5 p-0">
              {products.map((product) => (
                <div className="col-md-3 my-3">
                  <img
                    src={`${product.image.url}`}
                    className="img-fluid"
                    alt="product"
                  />
                  <p className="product-name">{product.name}</p>
                  <p className="product-category">{product.category}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="product-price">${product.price}</p>
                    <button
                      className="cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Product;
