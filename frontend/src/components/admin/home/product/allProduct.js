import { useEffect, useState } from "react";
import "./allProduct.css";
import axios from "axios";
const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios.get("http://localhost:8080/product");
    setProducts(res.data);
    console.log(products);
  };

  return (
    <div className="all-products">
      <h3>All Products</h3>
      <main>
        <div
          className="container-fluid .fluid-admin bg-trasparent my-4 p-3"
          style={{ position: "relative" }}
        >
          <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center">
            {products.map((product) => (
              <>
                <div className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image.url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-primary">
                          {product.name}
                        </span>
                        <span className="float-end price-hp">
                          ${product.price}
                        </span>
                      </div>
                      <h5 className="card-title">{product.description}</h5>
                      <div className="text-center my-4">
                        {/* <a href="ab.com" className="btn btn-warning">
                          Check offer
                        </a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllProduct;
