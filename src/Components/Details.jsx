import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "../utils/Axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from 'react-toastify';


const Details = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

  const [product, setProduct] = useState(null);
  const {id} = useParams();

  // const getSingleProduct = async () => {
  //   try{
  //     const {data} = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   }catch (error){
  //     console.log(error);
  //   }
  // }

  useEffect(()=>{
    // getSingleProduct();
    if(!product){
      setProduct(products.filter((p) => p.id == id)[0]);
    }
  },[]);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setProducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.success("Product Deleted Successfully");
    navigate("/");
  }


  return ( product ?
    <div className="w-[70%] flex justify-between items-center h-full m-auto p-[10%]">
      <img className="h-[80%] w-[40%] object-contain" src={`${product.image}`} alt="" />
      <div className="content w-[50%]">
        <h1 className="text-3xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-3">{product.category}</h3>
        <h2 className="text-red-300 my-3">$ {product.price}</h2>
        <p className="mb-8">{product.description} 
        </p>
        <Link to={`/edit/${product.id}`} className="border-blue-300 border rounded mb-2 px-5 py-2 text-blue-300 mr-5 font-medium ">Edit</Link>
        <button onClick={() => ProductDeleteHandler(product.id)} className="border-red-300 border rounded mb-2 px-5 py-2 text-red-300 font-medium ">Delete</button>
      </div>
    </div>
    : <Loading/>
  ) 
};

export default Details;
