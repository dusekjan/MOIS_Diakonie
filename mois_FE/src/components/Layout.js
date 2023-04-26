import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default Layout;
