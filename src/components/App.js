import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AuthProvider} from "../providers/Auth"; 


import SignUp from "./sign-up/SignUp";
import Subscriptions from "./subscriptions/Subscriptions";
import Subscription from "./subscriptions/Subscription";
import Home from "./home/Home";
import Login from "./login/Login";



export default function App() {

    return (

        <>  
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/subscription/:id" element={<Subscription />} />
                        <Route path="/subscriptions" element={<Subscriptions />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/" element={<Login />} />
                    </Routes> 
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}