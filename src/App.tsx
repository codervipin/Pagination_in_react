import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Product from "./Product";

type ProductsData = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
};

const App = () => {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=0");
    // const res = await fetch(
    //   `https://dummyjson.com/products?limit=15&skip=${page * 15 - 15}`
    // );
    const data = await res.json();
    setProducts(data.products);
    setTotalProducts(data?.total);
    // console.log(products);
  };

  const handleClick = (selectedPage: any) => {
    if (selectedPage < 1 || selectedPage > 13) {
      return;
    }
    setPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <>
      <Header />

      {products.length > 0 && (
        <div className="products">
          {/* {products?.map((prod) => {
            return <Product key={prod?.id} data={prod} />;
          })} */}
          {products.slice(page * 15 - 15, page * 15)?.map((prod) => {
          return <Product key={prod?.id} data={prod} />;
        })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handleClick(page - 1)}
            className={page === 1 ? "disable" : ""}
          >
            Prev
          </button>
          {[...Array(Math.ceil(totalProducts / 15))].map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={page === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            onClick={() => handleClick(page + 1)}
            className={page === 13 ? "disable" : ""}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default App;
