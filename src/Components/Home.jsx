import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const {search} = useLocation();
  const category = decodeURIComponent (search.split("=")[1]);

  const [filterProducts, setfilterProducts] = useState(null)

  const getProductsCategory = async () => {
    try {
      const {data} = await axios.get(`/products/category/${category}`);
      setfilterProducts(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect( () => {
    if(!filterProducts || category == "undefined") setfilterProducts(products);
    if(category != "undefined") {
      // getProductsCategory();
      setfilterProducts(products.filter((p) => p.category == category));
    }
  },[category, products])

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-16 flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterProducts && filterProducts.map((p, i) => (
          <Link
            key={p.id}
            to={`/details/${p.id}`}
            className="w-[18%] h-[40vh] mr-3 mb-3 card p-5 border shadow rounded flex flex-col items-center justify-center"
          >
            <div
              style={{
                backgroundImage:
                  `url(${p.image})`,
              }}
              className="hover:scale-110 mb-5 w-full h-[75%] bg-contain bg-no-repeat bg-center"
            ></div>
            <h1 className="hover:text-blue-300">{p.title}</h1>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
