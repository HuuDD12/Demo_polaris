import React from 'react';
import { Page } from '@shopify/polaris';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '@/pages/Home/home';
import PolarisDemo from '@/pages/Home/polaris';
import { publicRoutes } from '@/constants/routes';

const Content = () => {
    const location = useLocation();

    return (
            <Routes location={location}>
                        {publicRoutes.map((route, index) => (
                            <Route
                                key={`index_${index}`}
                                path={`${route.path}`}
                                element={React.createElement(route.element)}
                            />
                        ))}
                    </Routes>
    );
};

export default Content;