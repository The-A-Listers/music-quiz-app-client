import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const MainLayout = () => <>
    <Header />
    <main>
        <Outlet/>
    </main>
    <Footer/>
</>;

export default MainLayout;