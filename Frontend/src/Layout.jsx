import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-bg-light text-text-light overflow-hidden font-body selection:bg-accent selection:text-white">
            <Navbar />
            <main className="grow w-full relative z-0">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
