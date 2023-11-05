
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Welcome from "../../pages/Welcome";
import Game from "../../pages/Game";
import TailTest from "../Test/TailTest";
import MainLayout from "../layouts/mainLayout";

const Router = () => <Routes>
    <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="welcome" element={<Welcome/>} />
        <Route path="game" element={<Game/>} />
        <Route path="tailtest" element={<TailTest/>} />
        <Route path="*" element={<NotFound/>} />
    </Route>
</Routes>;

export default Router;