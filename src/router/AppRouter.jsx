import React from "react";
import {HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Documents from "../components/principal_pages/documents"
import FatherComponent from '../components/father';
import Error404 from '../components/error404'
import Index from '../components/principal_pages/index';
import Login from '../components/principal_pages/Login';
import ManageUser from "../components/principal_pages/manageUsers";


function AppRouter(){
    const type_user = useSelector(state => state.auth_digital_cloud.type_user )
    return(
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<FatherComponent />}>
                        <Route path="/login" element={<Login />}/>
                        <Route path="*" element={<Error404 />}/>
                        <Route path="/Error404" element={<Error404 />}/>
                        {type_user === 1 &&(
                            <>
                                <Route path="/manageUser" element={<ManageUser />}/>
                            </>
                            )}
                        {type_user >0? (
                            <>
                                <Route index element={<Index/>}/>
                                <Route path="/documents" element={<Documents />}/>
                            </>
                            ) : (
                            <Route path='*' element={<Navigate to='/Error404' replace />} />
                        )}                                           
                    </Route>
                </Routes>
            </HashRouter>
        </>
    )
}
export default AppRouter
