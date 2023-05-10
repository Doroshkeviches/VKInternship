import React, { Children } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import './style.sass'

const Layout = ({ children }: any) => {
    return (
        <><Header />
            <div className='sidebar-grid-container'>
                <div className='sidebar-grid-item'>
                    <Sidebar />
                </div>
                <div className='sidebar-grid-item-children'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;