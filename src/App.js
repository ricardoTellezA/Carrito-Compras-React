
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { urlApiProducts } from './utils/constans';
import Products from "./components/products";
import { STORAGE_PRODUCTS_CARD } from "./utils/constans";
function App() {


  const products = useFetch(urlApiProducts, null);
  const [productsCard, setProductCard] = useState([]);

  useEffect(() => {
    getProductsCard();
  }, [])
  const getProductsCard = () => {
    const idProducts = localStorage.getItem(STORAGE_PRODUCTS_CARD);

    if (idProducts) {
      const idProductsSplit = idProducts.split(',');
      setProductCard(idProductsSplit);
    } else {
      setProductCard([]);
    }
  }

  const addProductCard = (id, name) => {
    const idsProducts = productsCard;
    idsProducts.push(id);
    setProductCard(idsProducts);

    localStorage.setItem(STORAGE_PRODUCTS_CARD, productsCard);
    getProductsCard();

    toast.success(`${name} se ha añadido al carrito correctamente`);


  }



  return (
    <div className="App">
      <TopMenu productsCard={productsCard}  getProductsCard={getProductsCard} products={products}/>
      <Products products={products} addProductCard={addProductCard} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
