import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import DashboardApp from './components/DashboardApp';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashbaord'; // Correct the typo in the page import
import Reviews from './pages/Reviews';

const PrivateRoute = ( { element } ) => {
    const [isLoggedIn] = useState( localStorage.getItem( 'token' ) );

    return isLoggedIn ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute
                            element={
                                <div className="flex">
                                    <Sidebar />
                                    <div className="flex-1">
                                        <Outlet />
                                    </div>
                                </div>
                            }
                        />
                    }
                >
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/reviews" element={<Reviews />} />

                </Route>

                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
