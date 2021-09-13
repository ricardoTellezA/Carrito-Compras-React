import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap';
import Cart from '../cart';
import {ReactComponent as Logo} from '../../assets/svg/logo.svg';


import './TopMenu.scss';

const TopMenu = ({productsCard, getProductsCard, products}) => {
    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                <BrandNav />
                {/* MENU */}
                {/* <MenuNav/> */}
                <Cart productsCard={productsCard} getProductsCard={getProductsCard} products={products}/>

            </Container>
        </Navbar>
    )
}

function BrandNav() {
    return (
        <Navbar.Brand>
            <Logo/>
            <h2>La casa de los helados</h2>
            
        </Navbar.Brand>
    )

}

function MenuNav(){
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#">Aperitivos</Nav.Link>
            <Nav.Link href="#">Helados</Nav.Link>
            <Nav.Link href="#">Mascotas</Nav.Link>
        </Nav>
    )
}

export default TopMenu
