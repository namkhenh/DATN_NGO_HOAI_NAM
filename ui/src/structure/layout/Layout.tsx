import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import './Layout.scss'
import Footer from '../footer/Footer';
import  MessageBar  from '../../common/messageBar/MessageBar';
import { useStateValue } from '../../context/StateProvider';
import { MessageBarStatus } from '../../model/enum/messageBarEnum';

export function Layout() {
    return (
        <div className="layout">
            <Header/>
            <Outlet></Outlet>
            <Footer></Footer>
            <MessageBar></MessageBar >
        </div>
    );
}
