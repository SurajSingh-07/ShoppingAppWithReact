import React, { useContext } from "react";
import { ProductContext } from "../utils/Context.jsx";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];


  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.8)`
  }

  return (
    <nav className="w-[15%] h-full bg-zinc-300 flex flex-col items-center pt-5">
      <a
        className="border-black border rounded mb-2 px-2 bg-blue-100 font-medium "
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%]" />
      <h1 className="font-bold uppercase my-3">Category</h1>
      <div>
        {distinct_category.map((c, i) => (
          <Link key={i} to={`/?category=${c}`} className="mb-3 flex capitalize items-center">
            <span style={{backgroundColor: color()}} className="w-[15px] h-[15px] rounded-full mr-2"></span>
            {c}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
