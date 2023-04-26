import {BrowserRouter, Routes, Route} from "react-router-dom";
import DonationsPage from "./pages/DonationsPage";
import ProjectPage from "./pages/ProjectPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage";


function App() {

    return (
        <>
            <BrowserRouter>
                <ScrollToTop />  {/* magic for automatic scroll to the top after redirect */}
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="project/:projectId" element={<ProjectPage />} />
                        <Route path="donations" element={<DonationsPage />} />
                        <Route path="login" element={<LoginPage />} />

                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
