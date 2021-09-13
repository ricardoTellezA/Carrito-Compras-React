import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import {BASE_PATH} from '../../utils/constans';

import './Product.scss';

const Product = ({product, addProductCard}) => {


    const {image,name, extraInfo, price, id} = product;

    
    return (
        <Col xs={3} className="product">
            <Card  className="">
                <Card.Img variant="top" src={`${BASE_PATH}/${image}`}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{extraInfo}</Card.Text>
                    <Card.Text>{price.toFixed(2)} USD/Unidad</Card.Text>
                    <Button onClick={() => addProductCard(id,name)}>
                        Añadir al carrito
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Product
