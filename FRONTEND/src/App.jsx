import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { PageNotFound } from "./pages/PageNotFound";
import { ProfilePage } from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import { ProjectPage } from "./pages/ProjectPage";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const GA_MEASUREMENT_ID =
    import.meta.env.VITE_GA_MEASUREMENT_ID || "G-WB3B9RPBB0";
const IS_TRACKING_ENABLED = import.meta.env.PROD && Boolean(GA_MEASUREMENT_ID);

if (IS_TRACKING_ENABLED) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
}

// Track route changes as pageviews in production.
const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        if (!IS_TRACKING_ENABLED) {
            return;
        }

        ReactGA.send({
            hitType: "pageview",
            page: location.pathname,
        });
    }, [location]);

    return null;
};
const App = () => {
    return (
        <BrowserRouter>
            <AnalyticsTracker />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
