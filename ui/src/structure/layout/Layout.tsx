import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../header/Header';
import './Layout.scss'
import Footer from '../footer/Footer';

export function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}
