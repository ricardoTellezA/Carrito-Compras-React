import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Loading from '../loading';
import Product from '../product';

const Products = ({ products, addProductCard }) => {

    const { result, loading, error } = products;
    return (
        <Container>
            <Row>
                {
                    loading || !result ? (
                        <Loading />
                    ) : (
                        result.map((product, index) => <Product key={index} product={product} 
                        addProductCard={addProductCard}/>)
                    )
                }
            </Row>
        </Container>
    )
}

export default Products
