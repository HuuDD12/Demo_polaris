import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from '@/pages/Home/home';
import PolarisDemo from '@/pages/Home/polaris';

const GuestLayout = () => {

    return (
        <div className="w-screen bg-slate-700 h-screen overflow-hidden md:px-0 px-5 flex items-center justify-center">
            <Routes>
                <Route path='/home' element={<Home/>}/>
                <Route path='/demo' element={<PolarisDemo/>}/>

            </Routes>
        </div>
    );
};
export default GuestLayout;
