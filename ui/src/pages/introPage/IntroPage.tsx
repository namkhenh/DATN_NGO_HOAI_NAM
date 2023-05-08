import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../structure/footer/Footer';

class IntroPage extends Component {
    render() {
        return (
            <div className="intro-page">
                <Outlet></Outlet>
                {/* <Footer/> */}
            </div>
        );
    }
}

export default IntroPage;