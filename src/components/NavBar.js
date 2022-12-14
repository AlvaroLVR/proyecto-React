import React from 'react'
import logoMenu from '../img/logoMenu.svg'
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

export const NavBar = () => {
    const { totalCant } = useCartContext()

    return <>

        <nav className="navbar navbar-expand-lg py-0 bg-dark">
            <div className="container">
                <Link className="navbar-brand header-logo" to={'/'}>
                    <img style={{ height: '30px' }} className='svg' src={logoMenu} alt='' />
                </Link>
                <button className="navbar-toggler m-3 bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="offcanvas offcanvas-end bg-dark" tabIndex={-1} id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">

                    <div className="offcanvas-header ">
                        <Link to={'/'} className="navbar-brand header-logo " >
                            <img className='svg' style={{ height: '30px' }} src={logoMenu} alt='' />
                        </Link>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body justify-content-center bg-dark">
                        <div className="navbar container-fluid bg-dark">
                            <ul id="header-list-left" className="navbar-nav mb-lg-0">
                                <li className="nav-item">
                                    <Link to={`/categoria/${`men's clothing`}`} className="nav-link text-light fs-6" >Hombres</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/categoria/${`women's clothing`}`} className="nav-link text-light fs-6" >Mujeres</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/categoria/${`jewelery`}`} className="nav-link text-light fs-6" >Accesorios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/categoria/${`electronics`}`} className="nav-link text-light fs-6" >Importados</Link>
                                </li>
                            </ul>
                            <ul id="header-list-right" className="navbar-nav mb-lg-0">
                                <li className="nav-item">
                                    <Link to={'/sobrenosotros'} className="nav-link text-light fs-6" >Sobre nosotros</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/blog'} className="nav-link text-light fs-6" >Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/carrito'} className="nav-link text-light fs-6" > 
                                        <CartWidget /> 
                                        {
                                            totalCant == 0 ? <></> : totalCant
                                        } 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
};
