import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { routes } from './data';
import Layout from '../layout';
import useAuth from '../auth/userAuth';

const RoutesList = () => {
    return (
        <Router>
            <Routes>
                {routes.map(route => {
                    return (
                        <Route
                            path={route.path}
                            key={`route ${route.path}`}
                            element={<Layout><route.component/></Layout>}
                        >
                        </Route>
                    )
                })}
                {/* <Route element={Error404}/> */}
            </Routes>
        </Router>
    );
};

export default RoutesList;