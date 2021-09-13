import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { ReactComponent as CartEmpty } from '../../assets/svg/cart-empty.svg';
import { ReactComponent as CartFull } from '../../assets/svg/cart-full.svg';
import { ReactComponent as Close } from '../../assets/svg/close.svg';
import { ReactComponent as Garbage } from '../../assets/svg/garbage.svg';
import { STORAGE_PRODUCTS_CARD, BASE_PATH } from '../../utils/constans'
import { removeArrayDuplicates, countDuplicatesItemArray, removeItemArray } from '../../utils/ArraysFunct'

import './Cart.scss';

const Cart = ({ productsCard, getProductsCard, products }) => {

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const [singleProductsCart, setSingleProductsCart] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);


    useEffect(() => {
        const allProductsId = removeArrayDuplicates(productsCard);
        setSingleProductsCart(allProductsId);
    }, [productsCard]);

    useEffect(() => {
        const productData = [];
        let totalPrice = 0;
        const allProductsId = removeArrayDuplicates(productsCard);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesItemArray(productId, productsCard);
            const productValue = {
                id: productId,
                quantity

            };

            productData.push(productValue);

        });

        if (!products.loading && products.result) {
            products.result.forEach(product => {
                productData.forEach(item => {
                    if (product.id == item.id) {
                        const totalValue = product.price * item.quantity;
                        totalPrice = totalPrice + totalValue;

                    }
                })
            })
        }

        setCartTotalPrice(totalPrice);
    }, [productsCard, products]);



    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = "scroll";
    };

    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CARD);
        getProductsCard();
    }

    const increaseQuantity = id => {
        const arrayItemsCart = productsCard;
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CARD, arrayItemsCart);
        getProductsCard();
    }

    const creaseQuantity = id => {
        const arrayItemsCart = productsCard;
        const result = removeItemArray(arrayItemsCart, id.toString());
        localStorage.setItem(STORAGE_PRODUCTS_CARD, result);
        getProductsCard();
    }


    return (
        <>
            <Button variant="link" className="cart">
                {productsCard.length > 0 ? (
                    <CartFull onClick={openCart} />
                ) : (
                    <CartEmpty onClick={openCart} />
                )}
            </Button>
            <div className="cart-content" style={{ width: widthCartContent }}>
                <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
                <div className="cart-content__products">
                    {singleProductsCart.map((idProductsCart, index) => (
                        <CartContentProducts
                            key={index}
                            products={products}
                            idsProductsCart={productsCard}
                            idProductsCart={idProductsCart}
                            increaseQuantity={increaseQuantity}
                            creaseQuantity={creaseQuantity}
                        />

                    ))}
                </div>
                <CartContentFooter cartTotalPrice={cartTotalPrice} />
            </div>
        </>
    )
}


function CartContentHeader({ closeCart, emptyCart }) {


    return (
        <div className="cart-content__header">
            <div>
                <Close onClick={closeCart} />
                <h2>Carrito</h2>
            </div>
            <Button variant="link">
                Vaciar
                <Garbage onClick={emptyCart} />
            </Button>
        </div>
    )

}

function CartContentProducts({ products, idsProductsCart, idProductsCart, increaseQuantity, creaseQuantity }) {

    const { loading, result } = products;


    if (!loading && result) {
        return result.map((product, index) => {
            if (idProductsCart == product.id) {
                const quantity = countDuplicatesItemArray(product.id, idsProductsCart)
                return (
                    <RenderProduct
                        key={index}
                        product={product}
                        quantity={quantity}
                        increaseQuantity={increaseQuantity}
                        creaseQuantity={creaseQuantity}
                    />
                )
            }
        })
    }

    return null;


}

function RenderProduct({ product, quantity, increaseQuantity, creaseQuantity }) {
    return (
        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)}...</h3>
                    <p>{product.price.toFixed(2)} USD / uds.</p>
                </div>
                <div>
                    <p>En carro: {quantity} ud.</p>

                    <div>
                        <button onClick={() => increaseQuantity(product.id)}>+</button>
                        <button onClick={() => creaseQuantity(product.id)}>-</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

function CartContentFooter(props) {
    const { cartTotalPrice } = props;
    return (
        <div className="cart-content__footer">
            <div>
                <p>Total:</p>
                <p>{cartTotalPrice.toFixed(2)} USD</p>

            </div>
            <Button>Pagar</Button>
        </div>
    )
}
export default Cart
